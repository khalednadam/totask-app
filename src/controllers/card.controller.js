const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { cardService, boardService, listService, checklistService, emailService } = require("../services");
const config = require("../config/config");
const { io } = require("../socket");
const { Card } = require("../models");

const createCard = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const highestPosCard = await cardService.queryCards({ list: req.body.list }, { sortBy: "position:desc", limit: 1 });
  const position = (highestPosCard.results[0]?.position || 0) + parseFloat(config.POSITION_GAP);
  const card = await cardService.createCard({ ...req.body, position }, req.session.user.id);
  const cards = await cardService.getCardsByListId(req.body.list);
  // io.emit("update-cards", { boardId: req.body.board, lists: [req.body.list], cards: cards });
  res.status(httpStatus.CREATED).send(card);
})

const getCardById = catchAsync(async (req, res) => {
  const card = await cardService.getCardById(req.params.cardId, req.session.user.id);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card was not found");
  }
  // req.redisClient.set(req.originalUrl, JSON.stringify(card), 'EX', 1);
  res.status(httpStatus.OK).send(card);
})

// const getCardsByList = catchAsync(async (req, res) => {
//   if (!req.session.user) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
//   }
//   const filter = {
//     list: req.params.listId,
//     // title: req.query.title
//   };
//   if (req.query.title && req.query.title.trim().length > 1) {
//     filter.title = { $regex: req.query.title, $options: 'i' };
//   }
//   if (Array.isArray(req.query.date) && req.query.date.length === 2) {
//     const [startDate, endDate] = req.query.date;
//     filter.endDate = {
//       $gte: new Date(startDate),   // Cards ending after or on startCheckingDate
//       $lte: new Date(endDate)      // Cards ending before or on endCheckingDate
//     };
//   }
//   if (req.query.assignees) {
//     filter.assignees = { $in: req.query.assignees };
//   }
//   if (req.query.labels) {
//     filter.labels = { $in: req.query.labels };
//   }
//   const list = await listService.getListById(req.params.listId);
//   if (!list) {
//     throw new ApiError(httpStatus.NOT_FOUND, "List was not found");
//   }
//   const isMember = await boardService.checkIfUserIsMember(list.board, req.session.user.id);
//   if (!isMember) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to see these cards");
//   }
//   const options = pick(req.query, ["sortBy", "limit", "page"]);
//   req.query.populate = 'assignees'
//   const cards = await cardService.queryCards(filter, options);
//   res.status(httpStatus.OK).send(cards);
// })

const getCardsByList = catchAsync(async (req, res) => {
  // Ensure user is authenticated
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }

  // Prepare filter based on query parameters
  const filter = { list: req.params.listId };
  if (req.query.title && req.query.title.trim().length > 1) {
    filter.title = { $regex: req.query.title, $options: 'i' };
  }
  if (Array.isArray(req.query.date) && req.query.date.length === 2) {
    const [startDate, endDate] = req.query.date;
    filter.endDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  if (req.query.assignees) {
    filter.assignees = { $in: req.query.assignees };
  }
  if (req.query.labels) {
    filter.labels = { $in: req.query.labels };
  }

  // Fetch list details
  // const list = await listService.getListById(req.params.listId);
  // if (!list) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "List was not found");
  // }


  // Prepare options for queryCards function
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  options.populate = 'assignees'; // Populate assignees field

  // Query cards based on filter and options
  const cards = await cardService.queryCards(filter, options);
  //TODO: fix
  // Check user's membership in the board
  const isMember = await boardService.checkIfUserIsMember(req.query.board, req.session.user.id);
  if (!isMember) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to see these cards");
  }
  // Send response
  // req.redisClient.set(req.originalUrl, JSON.stringify(cards), 'EX', 1);
  res.status(httpStatus.OK).send(cards);
});

const updateCardById = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const oldCard = await cardService.getCardById(req.params.cardId, req.session.user.id);
  const newCard = await cardService.updateCardById(req.params.cardId, req.body, req.session.user.id, req.file);
  const filter = {
    list: newCard.list,
  };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const newListCards = await cardService.queryCards(filter, options);
  io.emit("update-cards", { boardId: newCard.board, lists: [newCard.list, oldCard.list._id], cards: newListCards });
  res.status(httpStatus.OK).send(newCard);
})

const deleteCardById = catchAsync(async (req, res) => {
  const deletedCard = await cardService.deleteCardById(req.params.cardId, req.session.user.id);
  if (!deletedCard) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card was not found")
  }
  res.status(httpStatus.OK).send(deletedCard);
})

const updateCardDates = catchAsync(async (req, res) => {
  const updatedCard = await cardService.updateCardById(req.params.cardId, { startDate: req.body.startDate, endDate: req.body.endDate }, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})

const updateCardTitle = catchAsync(async (req, res) => {
  const updatedCard = await cardService.updateCardById(req.params.cardId, { title: req.body.title }, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})

const updateCardDescription = catchAsync(async (req, res) => {
  const updatedCard = await cardService.updateCardById(req.params.cardId, { description: req.body.description }, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})

const updateCardIsComplete = catchAsync(async (req, res) => {
  const updatedCard = await cardService.updateCardById(req.params.cardId, { isComplete: req.body.isComplete }, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})

const updateCardAssignees = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId, 'assignees').populate('assignees');
  const updatedCard = await cardService.updateCardById(req.params.cardId, { assignees: req.body.assignees }, req.session.user.id);
  const createMsg = (name) => {
    const msg = `
  <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h1 style="color: #333;">You have been added to a card</h1>
<p style="color: #666; line-height: 1.6;">Hello ${name},</p>
<p style="color: #666; line-height: 1.6;">You have been added to ${updatedCard.title}.</p>
<p style="color: #666; line-height: 1.6;">You can view the card <a href="${config.baseURL}/b/${updatedCard.board._id.toString()}" style="color: #6DB193; text-decoration: none;">here</a>.</p>
    <p style="color: #666; line-height: 1.6;">Thank you!</p>
  </div>
`
    return msg;
  }
  const newAssignees = req.body.assignees.filter(assingee => !card.assignees.map(cardAssignee => cardAssignee.id).includes(assingee.id));
  for (let assignee in newAssignees) {
    console.log(newAssignees[assignee])
    await emailService.sendEmail(newAssignees[assignee].email, 'You have been added to a card', createMsg(newAssignees[assignee].name));
  }
  res.status(httpStatus.OK).send(updatedCard);
})

const addChecklist = catchAsync(async (req, res) => {
  const card = await cardService.getCardById(req.params.cardId, req.session.user.id);
  const checklist = await checklistService.createChecklist(req.body, req.session.user.id);
  if (!checklist) {
    throw new ApiError("checklist was not created");
  }
  const updatedCard = await cardService.updateCardById(req.params.cardId, { checklist: checklist.id }, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})

const updateLabels = catchAsync(async (req, res) => {
  const updatedCard = await cardService.updateCardById(req.params.cardId, { labels: req.body.labels }, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})


const deleteChecklist = catchAsync(async (req, res) => {
  const card = await cardService.getCardById(req.params.cardId, req.session.user.id);
  if (!card.checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, "This card doesn't have a checklist");
  }
  const checklist = await checklistService.deleteChecklist(card.checklist);
  const updatedCard = await cardService.updateCardById(card.id, { checklist: null }, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})

const updateCover = catchAsync(async (req, res) => {
  const updatedCard = await cardService.updateCardById(req.params.cardId, {}, req.session.user.id, req.file);
  res.status(httpStatus.OK).send(updatedCard);
})

const deleteCardCover = catchAsync(async (req, res) => {
  const updatedCard = await cardService.deleteCardCover(req.params.cardId, req.session.user.id);
  res.status(httpStatus.OK).send(updatedCard);
})

const addAttachments = catchAsync(async (req, res) => {
  const updatedCard = await cardService.addAttachments(req.params.cardId, req.session.user.id, req.files);
  res.status(httpStatus.OK).send(updatedCard);
})

const deleteAttachment = catchAsync(async (req, res) => {
  const updatedCard = await cardService.deleteAttachment(req.params.cardId, req.session.user.id, req.body.attachmentToDelete);
  res.status(httpStatus.OK).send(updatedCard);
})

module.exports = {
  createCard,
  getCardById,
  getCardsByList,
  updateCardById,
  deleteCardById,
  updateCardDates,
  updateCardTitle,
  updateCardDescription,
  updateCardIsComplete,
  updateCardAssignees,
  addChecklist,
  deleteChecklist,
  updateLabels,
  updateCover,
  deleteCardCover,
  addAttachments,
  deleteAttachment
}

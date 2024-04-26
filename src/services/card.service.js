const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Card, Label, User } = require("../models/index");
const { boardService } = require(".");
const googleStorage = require("../utils/googleStorage");

/**
 * creates a card
 * @param {Object} cardBody
 * @param {ObjectId} userId
 * @returns {Board}
 */
const createCard = async (cardBody, userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const isMember = boardService.checkIfUserIsMember(cardBody.board, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "You're not a member");
  }
  cardBody.createdBy = userId;
  cardBody.updatedBy = userId;
  return Card.create(cardBody);
}

/**
 * gets a card by id
 * @param {ObjectId} cardId
 * @param {ObjectId} userId
 * @returns {Promise<Board>}
 */
const getCardById = async (cardId, userId) => {
  const card = await Card.findById(cardId).populate(['assignees', 'list', 'checklist', 'labels'])
    .populate({
      path: 'board',
      populate: {
        path: 'labels',
        model: Label
      },
    }).populate(
      {
        path: 'comments',
        populate: {
          path: 'user',
          model: User
        },
      }
    ).exec();
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card was not found")
  }
  if (card.checklist && card.checklist.checklistItems) {
    card.checklist.checklistItems.sort((a, b) => a.position - b.position);
  }
  const isMember = await boardService.checkIfUserIsMember(card.board, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "You're not a member");
  }
  return card;
}

/**
 * query cards
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<queryResults>}
 */
const queryCards = async (filter, options) => {
  options.populate = options.populate ? `${options.populate},assignees, list, checklist, labels, comments` : 'assignees, list, checklist, labels, comments';
  const cards = await Card.paginate(filter, options);
  return cards;
}

/**
 * Update a card by its ID.
 * @async
 * @param {string} cardId - The ID of the card to be updated.
 * @param {Object} cardBody - The updated properties of the card.
 * @param {string} userId - The ID of the user performing the action.
 * @param {Object} file - The file object representing the cover image to be uploaded (optional).
 * @returns {Promise<Object>} A Promise that resolves to the updated card object.
 * @throws {ApiError} Throws an ApiError if there is an issue with the operation, such as unauthorized access, card not found, or forbidden access.
 */
const updateCardById = async (cardId, cardBody, userId, file) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const card = await getCardById(cardId, userId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card not found");
  }
  const isMember = boardService.checkIfUserIsMember(card.board, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized to update this card");
  }
  if (file) {
    const imgUrl = await googleStorage.uploadToGoogleStorage(file.originalname, file.buffer);
    card.cover = imgUrl;
  }
  card.updatedAt = new Date();
  card.updatedBy = userId;
  Object.assign(card, cardBody);
  return await card.save().then(t => t.populate(['assignees', 'checklist', 'labels']));
}

/**
 * Deleting the card cover 
 * @param {ObjectId} cardId
 * @param {ObjectId} userId
 * @returns {Promise<Card>}
 */
const deleteCardCover = async (cardId, userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const card = await getCardById(cardId, userId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card not found");
  }
  const isMember = boardService.checkIfUserIsMember(card.board, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized to update this card");
  }
  await googleStorage.deleteFileFromGoogleStorage(card.cover);
  card.cover = null;
  card.updatedAt = new Date();
  card.updatedBy = userId;
  return await card.save().then(t => t.populate(['assignees', 'checklist', 'labels']));
}

/**
 * Add attachments to a card.
 * @async
 * @param {string} cardId - The ID of the card to which attachments will be added.
 * @param {string} userId - The ID of the user performing the action.
 * @param {Array<File>} attachments - An array of File objects representing the attachments to be added.
 * @returns {Promise<Object>} A Promise that resolves to the updated card object.
 * @throws {ApiError} Throws an ApiError if there is an issue with the operation, such as unauthorized access, card not found, or forbidden access.
 */
const addAttachments = async (cardId, userId, attachments) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const card = await getCardById(cardId, userId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card not found");
  }
  const isMember = boardService.checkIfUserIsMember(card.board, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized to update this card");
  }
  if (attachments) {
    const attachmentsUrls = await googleStorage.uploadMultipleToGoogleStorage(attachments);
    attachmentsUrls.map(url => card.attachments.push(url));
  }
  card.updatedAt = new Date();
  card.updatedBy = userId;
  return await card.save().then(t => t.populate(['assignees', 'checklist', 'labels']));
}


/**
 * Deletes an attachment from a card.
 * @async
 * @param {string} cardId - The ID of the card from which the attachment will be deleted.
 * @param {string} userId - The ID of the user performing the action.
 * @param {string} attachmentToDelete - The URL of the attachment to be deleted.
 * @returns {Promise<Object>} A Promise that resolves to the updated card object.
 * @throws {ApiError} Throws an ApiError if there is an issue with the operation, such as unauthorized access, card not found, or forbidden access.
 */
const deleteAttachment = async (cardId, userId, attachmentToDelete) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const card = await getCardById(cardId, userId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card not found");
  }
  const isMember = boardService.checkIfUserIsMember(card.board, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized to update this card");
  }
  console.log(attachmentToDelete)
  await googleStorage.deleteFileFromGoogleStorage(attachmentToDelete);
  card.attachments = card.attachments.filter(attachment => attachment !== attachmentToDelete);
  card.updatedAt = new Date();
  card.updatedBy = userId;
  return await card.save().then(t => t.populate(['assignees', 'checklist', 'labels']));
}

/**
 * deletes a card by id
 * @param {ObjectId} cardId
 * @param {ObjectId} userId
 * @returns {Promise<Card>}
 */
const deleteCardById = async (cardId, userId) => {
  const card = await getCardById(cardId, userId);
  const isMember = await boardService.checkIfUserIsMember(card.board, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "You're not a member");
  }
  await Card.deleteOne({ _id: card.id });
  return card;
}

module.exports = {
  createCard,
  getCardById,
  queryCards,
  updateCardById,
  deleteCardById,
  deleteCardCover,
  addAttachments,
  deleteAttachment
}

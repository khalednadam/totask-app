const express = require("express");
const { cardController } = require("../../controllers/index");
const validate = require("../../middlewares/validate");
const { cardValidation } = require("../../validations");
const router = express.Router();
const multer = require('multer');
// const checkCache = require("../../middlewares/redisCache");
const storage = multer.memoryStorage({
  destination: 'uploads/', // Specify the destination folder for uploaded files
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf') {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
    }
    const timestamp = Date.now();
    const fileExtension = file.originalname.split('.').pop(); // Get the file extension
    const filename = `${file.fieldname}-${timestamp}.${fileExtension}`;
    callback(null, filename);
  }
});
const upload = multer({ storage: storage });

router.post("/create", validate(cardValidation.createCard), cardController.createCard);
router.get("/cardsOf/:listId", cardController.getCardsByList);
router.get("/:cardId", validate(cardValidation.getCard), cardController.getCardById);
router.put("/:cardId", validate(cardValidation.updateCard), cardController.updateCardById);
router.delete("/:cardId", validate(cardValidation.deleteCard), cardController.deleteCardById);
router.put("/dates/:cardId", validate(cardValidation.updateCard), cardController.updateCardDates);
router.put("/title/:cardId", validate(cardValidation.updateCard), cardController.updateCardTitle);
router.put("/description/:cardId", validate(cardValidation.updateCard), cardController.updateCardDescription);
router.put("/isComplete/:cardId", validate(cardValidation.updateCard), cardController.updateCardIsComplete);
router.put("/assignees/:cardId", validate(cardValidation.updateCard), cardController.updateCardAssignees);
router.put("/labels/:cardId", validate(cardValidation.updateCard), cardController.updateLabels);
router.put("/addChecklist/:cardId", cardController.addChecklist);
router.put("/removeChecklist/:cardId", cardController.deleteChecklist);
router.put("/cover/:cardId", upload.single('file'), cardController.updateCover);
router.put("/deleteCover/:cardId", cardController.deleteCardCover);
router.put("/attachments/:cardId", upload.array('files', 5), cardController.addAttachments)
router.put("/deleteAttachment/:cardId", cardController.deleteAttachment)
module.exports = router;

const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { userValidation } = require("../../validations");
const { userController } = require("../../controllers/index");
const passport = require("passport");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage({
  destination: 'uploads/', // Specify the destination folder for uploaded files
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const fileExtension = file.originalname.split('.').pop(); // Get the file extension
    const filename = `${file.fieldname}-${timestamp}.${fileExtension}`;
    callback(null, filename);
  }
});
const upload = multer({ storage: storage });
router
  .route("/")
  .post(
    auth("admin"),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    // auth("admin"),
    validate(userValidation.getUsers),
    userController.getUsers
  );

router.route("/addToFav").put(validate(userValidation.toggleFavBoard), userController.addBoardToFavorite);
router.route("/removeFromFav").put(validate(userValidation.toggleFavBoard), userController.removeBoardFromFavorite);
router.route("/user").get(validate(userValidation.getCurrentUser), userController.getCurrentUser);
router.route("/getFav").get(validate(userValidation.getFavBoards), userController.getMyFavoriteBoards);
router.route("/getUsers").get(userController.searchUsers)
router.route("/deleteProfilePic/:userId").put(userController.deleteProfilePic);
router.route("/usersByMonth").get(userController.getUsersGroupedByMonth);
router
  .route("/:userId")
  .get(userController.getUser)
  .put(upload.single('file'), userController.updateUser)
  .post(userController.deleteUser);

module.exports = router;

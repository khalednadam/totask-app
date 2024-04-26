const express = require("express");
const validate = require("../../middlewares/validate");
const router = express.Router();

const multer = require('multer');
const { blogController } = require("../../controllers");
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

router.post("/create", upload.single('file'), blogController.createBlogPost);
router.get("/posts", blogController.getBlogPosts);
router
  .route("/:blogPostId")
  .put(upload.single('file'), blogController.updateBlogPost)
  .get(blogController.getBlogPostById)
  .delete(blogController.deleteBlogPostById)
module.exports = router;


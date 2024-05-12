const express = require("express");
const { premiumRequestController } = require("../../controllers");

const router = express.Router();

router.get('/all', premiumRequestController.queryRequests);
router.post('/create', premiumRequestController.createPremiumRequest);
router.post('/accept/:requestId', premiumRequestController.acceptRequest);
router.route('/:requestId')
  .get(premiumRequestController.getRequest)
  .delete(premiumRequestController.deleteRequest)

module.exports = router;

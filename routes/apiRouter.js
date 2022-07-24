const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/post/:id", apiController.post);
router.get("/responses/:id", apiController.getResponses);
router.get("/history", apiController.searchHistory);

module.exports = router;

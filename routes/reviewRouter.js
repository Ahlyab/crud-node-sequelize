const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// create review
router.post("/addReview", reviewController.addReview);

// get all reviews
router.get("/allReviews", reviewController.getAllReviews);

module.exports = router;

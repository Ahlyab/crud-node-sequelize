const db = require("../models");

// create main model

const Product = db.products;
const Review = db.reviews;

// add review

const addReview = async (req, res) => {
  const { rating, description, product_id } = req.body;

  try {
    const review = await Review.create({
      rating,
      description,
      product_id,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while creating the review.",
    });
  }
};

// get all reviews

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving reviews.",
    });
  }
};

module.exports = {
  addReview,
  getAllReviews,
};

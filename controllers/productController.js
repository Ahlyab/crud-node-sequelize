const { where } = require("sequelize");
const db = require("../models");

// create main model

const Product = db.products;
const Review = db.reviews;

// create product

const addProduct = async (req, res) => {
  const { title, price, description, published } = req.body;
  let info = {
    title,
    price,
    description,
    published: published ? published : false,
  };

  try {
    const product = await Product.create(info);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while creating the product.",
    });
  }
};

// get all products

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while retrieving products.",
    });
  }
};

// get single product

const getOneProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findOne({
      where: { id: id },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving product with id=" + id,
    });
  }
};

// update product

const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.update(req.body, {
      where: { id: id },
    });
    if (product == 1) {
      res.status(200).json({
        message: "Product was updated successfully.",
        product,
      });
    } else {
      res.status(400).json({
        message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating Product with id=" + id,
    });
  }
};

// delete product

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.destroy({
      where: { id: id },
    });
    if (product == 1) {
      res.status(200).json({
        message: "Product was deleted successfully!",
        product,
      });
    } else {
      res.status(400).json({
        message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Could not delete Product with id=" + id,
    });
  }
};

// get published products

const getPublishedProducts = async (req, res) => {
  console.log("coming here");
  try {
    const products = await Product.findAll({ where: { published: true } });
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while retrieving products.",
    });
  }
};

// connect one to many relation product and reviews

const getProductReviews = async (req, res) => {
  const id = req.params.id;

  try {
    const products = await Product.findAll({
      include: [
        {
          model: Review,
          as: "review",
        },
      ],
      where: { id: id },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving product with id=" + id,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProducts,
  getProductReviews,
};

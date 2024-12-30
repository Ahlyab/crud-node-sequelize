const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// create product
router.post("/addProduct", productController.addProduct);

// get all products
router.get("/allProducts", productController.getAllProducts);

// get published products
router.get("/published", productController.getPublishedProducts);

// get product reviews
router.get("/getProductReviews/:id", productController.getProductReviews);

// get single product
router.get("/:id", productController.getOneProduct);

// update product
router.put("/:id", productController.updateProduct);

// delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;

const mongoose = require("mongoose");
require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");

// Get all products:
function getAllProductsAsync() {
  return ProductModel.find().populate("category").exec();
}

// Get one product:
function getOneProductAsync(_id) {
  return ProductModel.findById(_id).exec();
}

// Add new product:
function addProductAsync(product) {
  return product.save();
}

// Update full or partial product:
async function updateProductAsync(product) {
  const info = await ProductModel.updateOne(
    { _id: product._id },
    product
  ).exec();

  return info.n ? product : null;
}

// Delete product:
function deleteProductAsync(_id) {
  return ProductModel.deleteOne({ _id }).exec();
}

// Get products by price range:
function getProductsByPriceRangeAsync(minPrice, maxPrice) {
  return ProductModel.find({
    price: { $gte: minPrice, $lte: maxPrice },
  }).exec();
}

// Get products by price1 or price2:
function getProductsByPricesAsync(price1, price2) {
  return ProductModel.find({ price: { $or: [price1, price2] } }).exec();
}

// Get products by min stock:
function getProductsByMinStock(minStock) {
  // Return products with category object with sorting by stock ascending and secondary sorting by price ascending::
  return ProductModel.find({ stock: { $gte: minStock } }, null, {
    sort: { stock: 1, price: 1 },
  })
    .populate("category")
    .exec();
}

// Get all categories
function getAllCategories() {
  return CategoryModel.find().populate("products").exec();
}

module.exports = {
  getAllProductsAsync,
  getOneProductAsync,
  addProductAsync,
  updateProductAsync,
  deleteProductAsync,
  getProductsByPriceRangeAsync,
  getProductsByPricesAsync,
  getProductsByMinStock,
  getAllCategories,
};

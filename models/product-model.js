const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Missing name"],
      minlength: [2, "Name must be minimum 2 chars"],
      maxlength: [100, "Name can't exceed 100 chars"],
    },
    price: {
      type: Number,
      required: [true, "Missing price"],
      min: [0, "Price can't be negative"],
      max: [1000, "Price can't exceed 1000"],
    },
    stock: {
      type: Number,
      required: [true, "Missing price"],
      min: [0, "Price can't be negative"],
      max: [1000, "Price can't exceed 1000"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
);

// Virtual Field
ProductSchema.virtual("category", {
  ref: "CategoryModel",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;

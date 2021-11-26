var mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productName: "String",
  quantityAvailable: Number,
  price: Number,
});

module.exports = mongoose.model("Product", productsSchema);

var mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productName: "String",
  quantityAvailable: Number,
  price: Number,
  currency: "String",
});

// productsSchema.pre("remove", function (next) {
//   this.model;
// });

module.exports = mongoose.model("Product", productsSchema);

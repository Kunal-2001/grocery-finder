var mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  mobile: Number,
  password: "String",
  username: "String",
});

module.exports = mongoose.model("customer", customerSchema);

var mongoose = require("mongoose");

const shopAdminSchema = new mongoose.Schema({
  mobile: Number,
  username: "String",
  email: "String",
  password: "String",
  shopName: "String",
  city: "String",
  state: "String",
  country: "String",
  address: "String",
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  lastUpdated: {
    type: Date,
  },
});

module.exports = mongoose.model("shopAdmin", shopAdminSchema);

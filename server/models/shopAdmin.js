var mongoose = require("mongoose");

const shopAdminSchema = new mongoose.Schema({
  mobile: Number,
  email: "String",
  password: "String",
  shopName: "String",
  city: "String",
  state: "String",
  address: "String",
  latitude: {
    type: mongoose.Types.Decimal128,
  },
  longitude: {
    type: mongoose.Types.Decimal128,
  },
  lastUpdated: {
    type: Date,
  },
});

module.exports = mongoose.model("shopAdmin", shopAdminSchema);

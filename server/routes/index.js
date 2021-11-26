const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  registerCustomer,
  regsiterShopAdmin,
  loginShopAdmin,
  loginCustomer,
} = require("../controllers");
const Products = require("../models/products");
const ShopAdmin = require("../models/shopAdmin");
const { db } = require("../config/dbConfig");
const { extractClientUsefulInfo } = require("../helper");

router.post("/register", async (request, response) => {
  let { isShopAdmin } = request.body;

  if (isShopAdmin) {
    regsiterShopAdmin(request, response);
  } else {
    registerCustomer(request, response);
  }
});

router.post("/login", async (request, response) => {
  try {
    const { isShopAdmin } = request.body;

    if (isShopAdmin) {
      loginShopAdmin(request, response);
    } else {
      loginCustomer(request, response);
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

router.post("/findNearLocation", async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.body;

    ShopAdmin.find(
      {
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [longitude, latitude] },
            $maxDistance: maxDistance,
          },
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          let topNearestLocations = result.slice(0, Math.min(3, result.length));
          let usefulClientData = extractClientUsefulInfo(topNearestLocations);
          res.status(200).json(usefulClientData);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
});

router.post("/addProducts", async (req, res) => {
  const { products } = req.body;
  console.log(products);
});

module.exports = router;

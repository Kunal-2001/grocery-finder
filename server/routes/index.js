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
const shopAdmin = require("../models/shopAdmin");

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
    const { latitude, longitude, maxDistance, requiredProduct } = req.body;

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
          let usefulClientData = extractClientUsefulInfo(
            topNearestLocations,
            requiredProduct
          );
          console.log(usefulClientData);
          res.status(200).json(usefulClientData);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
});

router.post("/addNewProducts", async (req, res) => {
  const { addedProducts, mobileNo } = req.body;

  addedProducts.forEach((prod) => {
    const toAddProduct = new Products(prod);
    toAddProduct.save().then((res) => {
      ShopAdmin.findOneAndUpdate(
        { mobile: mobileNo },
        { $push: { products: res._id } },
        function (err, doc) {
          if (err) {
            throw err;
          }
          console.log("Data Added");
        }
      );
    });
  });
});

router.post("/updatedProducts", async (req, res) => {
  try {
    const { updatedData } = req.body;

    await Promise.all(
      updatedData.map((data) => {
        const product_id = data.id;
        const { productName, quantityAvailable, price, currency } = data;
        Products.findByIdAndUpdate(
          product_id,
          { productName, quantityAvailable, price, currency },
          (err, doc) => {
            console.log(doc);
          }
        );
      })
    );
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/getProducts", async (req, res) => {
  try {
    const { mobileNo } = req.body;

    ShopAdmin.findOne({ mobile: mobileNo })
      .populate("products")
      .exec((err, doc) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ data: doc.products });
      });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
});

module.exports = router;

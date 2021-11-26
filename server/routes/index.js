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

router.post("/addProducts", async (req, res) => {
  const { products } = req.body;
  console.log(products);
});

module.exports = router;

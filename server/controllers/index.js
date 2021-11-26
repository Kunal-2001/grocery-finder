const Customer = require("../models/customer");
const ShopAdmin = require("../models/shopAdmin");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");

async function registerCustomer(req, res) {
  try {
    const { mobile, password, username } = req.body;

    if (!mobile || !password || !username)
      return res.json({
        msg: "Not all fields have been entered.",
        status: false,
      });

    const existingUser = await Customer.findOne({
      username: username,
      mobile: mobile,
    });

    if (existingUser)
      return res.json({
        msg: "An account with this email already exists.",
        status: false,
      });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Customer({
      mobile,
      password: passwordHash,
      username,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
}

async function regsiterShopAdmin(req, res) {
  try {
    const {
      mobile,
      password,
      username,
      email,
      shopName,
      city,
      state,
      address,
      country,
    } = req.body;

    if (
      !mobile ||
      !password ||
      !username ||
      !email ||
      !shopName ||
      !city ||
      !state ||
      !address ||
      !country
    ) {
      return res.json({
        msg: "Not all fields have been entered.",
        status: false,
      });
    }
    const existingUser = await ShopAdmin.findOne({
      username: username,
      mobile: mobile,
    });

    if (existingUser)
      return res.json({
        msg: "An account with this username already exists.",
        status: false,
      });
    const encodedURI = encodeURI(address);
    const API_KEY = process.env.MAP_QUEST_API_KEY;

    const addressMetaInfo = await axios.get(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${encodedURI}`
    );

    const { lat, lng } = addressMetaInfo.data.results[0].locations[0].latLng;

    const addressCoords = { type: "Point", coordinates: [lng, lat] };
    const currentUpdateTime = new Date();

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const ShopAdminObject = new ShopAdmin({
      mobile,
      password: passwordHash,
      username,
      email,
      shopName,
      city,
      state,
      address,
      country,
      location: addressCoords,
      lastUpdated: currentUpdateTime,
    });

    const savedResponse = await ShopAdminObject.save();
    res.status(204);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
}

async function loginCustomer(req, res) {
  const { mobile, password } = req.body;

  if (!mobile || !password)
    return res.json({ msg: "Enter all the fields", status: false });

  const customer = await Customer.findOne({ mobile: mobile });

  if (!customer)
    return res.json({
      msg: "No account with this mobile number has been registered.",
      status: false,
    });

  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) return res.json({ msg: "Invalid password.", status: false });

  jwt.sign(
    { id: customer._id },
    "secret",
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        user: { id: customer._id, username: customer.username },
        status: true,
      });
    }
  );
}

async function loginShopAdmin(req, res) {
  const { mobile, password } = req.body;

  if (!mobile || !password)
    return res.json({ msg: "Enter all the fields", status: false });

  const admin = await ShopAdmin.findOne({ mobile: mobile });

  if (!admin)
    return res.json({
      msg: "No account with this mobile number has been registered.",
      status: false,
    });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.json({ msg: "Invalid password.", status: false });

  jwt.sign({ id: admin._id }, "secret", { expiresIn: 3600 }, (err, token) => {
    if (err) throw err;
    return res.status(200).json({
      token,
      user: { id: admin._id, username: admin.username },
      status: true,
    });
  });
}

module.exports = {
  registerCustomer,
  regsiterShopAdmin,
  loginCustomer,
  loginShopAdmin,
};

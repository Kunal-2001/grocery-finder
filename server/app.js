const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./config/database");
const indexRoute = require("./routes/index");
// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up routes

app.use("/", indexRoute);

const express = require("express");
const cors = require("cors");
const indexRoute = require("./routes/index");

// Config DB
require("./config/dbConfig");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up routes

// app.use("/", indexRoute);

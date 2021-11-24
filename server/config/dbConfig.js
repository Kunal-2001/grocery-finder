const mongoose = require("mongoose");
const dashboardName = "groceryFinder";

mongoose
  .connect("mongodb://localhost:27017/groceryFinder", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

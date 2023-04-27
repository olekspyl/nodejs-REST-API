const mongoose = require("mongoose");
const app = require("./app");

// const { DB_HOST } = process.env;
const DB_HOST =
  "mongodb+srv://oleksa:Sonce123@cluster0.merimpd.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

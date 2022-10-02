const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

console.log(process.env.DB_HOST);
const { DB_HOST, PORT = 3000 } = process.env;

// const config = require("./config");
// console.log(config.DB_HOST);
// const { DB_HOST, PORT = 3000 } = config;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
    console.log("PORT =", PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

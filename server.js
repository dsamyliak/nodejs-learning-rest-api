const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const path = require("path");

const { DB_HOST, PORT = 3000 } = process.env;

const createFolderIsNotExist = require("./middlewares");
const uploadDir = path.join(process.cwd(), "uploads");
const storeImage = path.join(process.cwd(), "images");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, async () => {
      createFolderIsNotExist.isAccesible(uploadDir);
      createFolderIsNotExist.isAccesible(storeImage);
      console.log(`Server running. Use on port:${PORT}`);
    });
    console.log("Database connection successful");
    console.log("PORT =", PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

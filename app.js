// const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");
const uploadDir = path.join(process.cwd(), "uploads");
const storeImage = path.join(process.cwd(), "images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { filesize: 1048576 },
});

const upload = multer({ storage: storage });

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/upload", upload.single("picture"), async (req, res, next) => {
  const { description } = req.body;
  const { path: temporaryName, originalname } = req.file;

  const fileName = path.join(storeImage, originalname);

  try {
    await fs.rename(temporaryName, fileName);
  } catch (error) {
    await fs.unlink(temporaryName);
    return next(error);
  }
  res.json({ description, message: "File upload complete", status: 200 });
});

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

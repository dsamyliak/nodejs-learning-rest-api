const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../middlewares");

const isbnRegexp = /^\d{3}-\d-\d{3}-\d{5}-\d$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    isbn: {
      type: String,
      required: false,
      match: isbnRegexp,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
  isbn: Joi.string().pattern(isbnRegexp).required(),
});

const Contact = model("contact", contactSchema);
// categories => category
// mice => mouse

const schemas = { addSchema };

module.exports = { Contact, schemas };

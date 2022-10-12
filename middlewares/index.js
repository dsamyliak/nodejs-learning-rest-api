const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const validateBodyFavorite = require("./validateBodyFavorite");
const validateBodySubscription = require("./validateBodySubscription");
const authenticate = require("./authenticate");
const isAccesible = require("./isAccesible");
const createFolderIsNotExist = require("./createFolderIsNotExist");

module.exports = {
  validateBody,
  isValidId,
  validateBodyFavorite,
  validateBodySubscription,
  authenticate,
  isAccesible,
  createFolderIsNotExist,
};

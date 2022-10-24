const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateUser = require("./updateUser");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateUser,
  updateAvatar,
  verify,
};

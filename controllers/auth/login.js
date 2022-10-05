const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email not found"); // Email or password wrong
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw RequestError(401, "Password wrong"); // Email or password wrong
  }
  const token = "dsaffsdds.asd3.sdafsad2";
  res.json({ token });
};

module.exports = login;

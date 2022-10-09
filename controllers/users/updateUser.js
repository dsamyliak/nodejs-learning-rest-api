const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { email, subscription } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(409, "No email in db. Login, please.");
  }

  const result = await User.findOneAndUpdate(
    { email },
    { subscription },
    { new: true }
  );
  res
    .status(201)
    .json({ email: result.email, subscription: result.subscription });
};

module.exports = updateUser;

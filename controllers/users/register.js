const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirm registration",
    html: `<a target="blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Press to confirm</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    verificationToken: result.verificationToken,
  });
};

module.exports = register;

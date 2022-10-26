const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Confirm registration",
    html: `<a target="blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Press to confirm</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;

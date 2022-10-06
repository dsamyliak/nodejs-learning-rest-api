const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, "name email phone favorite");
  res.json(result);
};

module.exports = listContacts;

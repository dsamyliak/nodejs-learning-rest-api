const { Contact } = require("../../models/contact");

const listContacts = async (_, res) => {
  const result = await Contact.find({}, "name email phone favorite");
  res.json(result);
};

module.exports = listContacts;

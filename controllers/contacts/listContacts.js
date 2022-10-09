const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  console.log("page=", page, "limit=", limit);
  const result = await Contact.find(
    { owner, ...query },
    "name email phone favorite",
    {
      skip: skip,
      limit: limit,
    }
  ).populate("owner", "name email");
  res.json(result);
};

module.exports = listContacts;

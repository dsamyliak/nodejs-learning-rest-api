const fs = require("fs").promises;
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    console.log(tempUpload);
    console.log(originalname);

    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250).write(tempUpload);

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;

const isAccesible = require("./isAccesible");
const fs = require("fs").promises;

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccesible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = createFolderIsNotExist;

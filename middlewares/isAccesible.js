const fs = require("fs").promises;

const isAccesible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

module.exports = isAccesible;

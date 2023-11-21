const fs = require("fs");
const path = require("path");

function findProjectRoot(startDir) {
  let currentDir = startDir;

  while (true) {
    const packageJsonPath = path.join(currentDir, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      return currentDir + "/config/config.env";
    }

    const parentDir = path.dirname(currentDir);

    if (currentDir === parentDir) {
      break;
    }

    currentDir = parentDir;
  }

  return null;
}

module.exports.findProjectRoot = findProjectRoot;

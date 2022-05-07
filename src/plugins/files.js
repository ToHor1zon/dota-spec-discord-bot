var fs = require('fs');

const readModuleFile = (path, callback) => {
  try {
    var filename = require.resolve(path);
    return fs.readFileSync(filename, 'utf8');
  } catch (e) {
    callback(e);
  }
}

module.exports = {
  getHtmlContentFromFile() {
    return readModuleFile('../html/index.html');;
  },
}
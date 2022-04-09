var fs = require('fs');

const nodeHtmlToImage = require('node-html-to-image');
let html;


function readModuleFile(path, callback) {
  try {
    var filename = require.resolve(path);
    fs.readFile(filename, 'utf8', callback);
  } catch (e) {
    callback(e);
  }
}

readModuleFile('../html/index.html', function (err, body) {
  html = body;
});

module.exports = {
  generateImage(payload) {
    nodeHtmlToImage({
      output: './image.png',
      html,
      transparent: true,
      content: payload,
    })
      .then(() => console.log('The image was created successfully!'))
  }
}
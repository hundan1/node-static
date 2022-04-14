const path = require('path');

const mimeTypes = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "zip": "application/zip",
  "tgz": "application/x-gtar",
  "tar.gz": "application/x-gzip",
};

const lookup = (pathName) => {
  let ext = path.extname(pathName);
  ext = ext.split('.').pop();
  return mimeTypes[ext] || mimeTypes['txt'];
}

module.exports = {
  lookup
};
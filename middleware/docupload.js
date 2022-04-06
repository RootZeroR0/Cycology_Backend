const multer = require("multer");
const DocFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application")){
    cb(null, true);
  } else {
    cb("Please upload only pdf.", false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/docuploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-cycology-${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: DocFilter });
module.exports = uploadFile;
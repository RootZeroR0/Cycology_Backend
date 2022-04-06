const fs = require("fs");
const db = require("../models");
const doc = db.docs;
const uploadFiles2 = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    doc.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/docuploads/" + req.file.filename
      ),
    }).then((document) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/doctmp/" + document.name,
        document.data
      );
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload documents: ${error}`);
  }
};
module.exports = {
  uploadFiles2,
};
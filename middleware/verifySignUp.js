const db = require("../models");
const User = db.users;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Name
  User.findOne({
    where: {
      fname: req.body.fname
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Name is already in use!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  });
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;
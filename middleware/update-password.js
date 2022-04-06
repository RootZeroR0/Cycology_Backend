/* update password to database */

const bcrypt = require('bcryptjs')
const db = require('../models')
const user = db.users

// const update_password = function (req, res, next) {

//     var token = req.body.token;
//     var password = req.body.password;

//     connection.query('SELECT * FROM users WHERE token ="' + token + '"', function (err, result) {
//         if (err) throw err;

//         var type
//         var msg

//         if (result.length > 0) {

//             var saltRounds = 10;

//             // var hash = bcrypt.hash(password, saltRounds);

//             bcrypt.genSalt(saltRounds, function (err, salt) {
//                 bcrypt.hash(password, salt, function (err, hash) {

//                     var data = {
//                         password: hash
//                     }

//                     connection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function (err, result) {
//                         if (err) throw err

//                     });

//                 });
//             });

//             type = 'success';
//             msg = 'Your password has been updated successfully';

//         } else {

//             console.log('2');
//             type = 'success';
//             msg = 'Invalid link; please try again';

//         }

//         req.flash(type, msg);
//         res.redirect('/');
//     });
// }

const update_password = async function (req, res, next) {

    var token = req.body.token;
    var password = req.body.password;

    const result = await user.findOne(
        { where: { token: token } }
    )
        
    var type
    var msg

    var star = result.dataValues.token
    // console.log(result)

    if (star.length > 0) {

        const salt = bcrypt.genSaltSync(10);
        const passuword = bcrypt.hashSync(password, salt);

        user.update(
            { password: passuword },
            { where: { token: token } }
        )

        console.log("kaka hoyeche!")
        type = 'success';
        msg = 'Your password has been updated successfully';

    } else {

        console.log('2');
        type = 'success';
        msg = 'Invalid link; please try again';

    }

    req.flash(type, msg);
    res.redirect('/');

}

module.exports = update_password
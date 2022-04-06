/* send reset password link in email */
const db = require('../models')
const user = db.users
const sendEmail = require('./email')
// var randtoken = require('rand-token')
var crypto = require("crypto");




// const reset_password_email = function (req, res, next) {

//     var email = req.body.email;

//     //console.log(sendEmail(email, fullUrl));

//     connection.query('SELECT * FROM users WHERE email ="' + email + '"', function (err, result) {
//         if (err) throw err;

//         var type = ''
//         var msg = ''

//         console.log(result[0]);

//         if (result[0].email.length > 0) {

//             var token = randtoken.generate(20);

//             var sent = sendEmail(email, token);

//             if (sent != '0') {

//                 // var data = {
//                 //     token: token
//                 // }

//                 // connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
//                 //     if(err) throw err

//                 // })

//                 user.update(
//                     { token: token },
//                     { where: { email: email } }
//                 )


//                 type = 'success';
//                 msg = 'The reset password link has been sent to your email address';

//             } else {
//                 type = 'error';
//                 msg = 'Something goes to wrong. Please try again';
//             }

//         } else {
//             console.log('2');
//             type = 'error';
//             msg = 'The Email is not registered with us';

//         }

//         req.flash(type, msg);
//         res.redirect('/');
//     });
// }

const reset_password_email = async function (req, res, next) {

    var tmail = req.body.email;

    //console.log(sendEmail(email, fullUrl));

    const x = await user.findOne({
        where: {
            email: tmail
        }
    })

    // if (err) throw err;


    var type = ''
    var msg = ''

    // console.log(x);
    var star = x.dataValues.email
    // console.log(star)

    if (star.length > 0) {

        const token = crypto.randomBytes(20).toString('hex');

        console.log(token)

        var sent = sendEmail(tmail, token);

        if (sent != '0') {

            // var data = {
            //     token: token
            // }

            // connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
            //     if(err) throw err

            // })

            user.update(
                { token: token },
                { where: { email: tmail } }
            )


            type = 'success';
            msg = 'The reset password link has been sent to your email address';

        } else {
            type = 'error';
            msg = 'Something goes to wrong. Please try again';
        }

    } else {
        console.log('2');
        type = 'error';
        msg = 'The Email is not registered with us';

    }

    req.flash(type, msg);
    res.redirect('/');

}


module.exports = reset_password_email 
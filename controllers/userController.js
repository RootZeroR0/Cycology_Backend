const db = require('../models')
// const bcrypt = require('bcrypt');

const bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

const generateToken = function (u) {
    try {
        let generatedToken = jwt.sign({
            _id: u._id
        }, process.env.SECRET_KEY);
        return generatedToken;
    } catch (error) {
        console.log(error)
    }
}



// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const user = db.users

// main work

// 1. create product

const addUser = async (req, res) => {

    let info = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        // password: bcryptjs.hashSync(req.body.password, 10),
        password: await bcrypt.hashSync(req.body.password, salt),
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        BirthDate: req.body.BirthDate,
    }
    console.log(info)
    const crud = await user.create(info)
    res.status(200).send(crud)
    console.log(crud)

}



// 2. get all products

const getAllUsers = async (req, res) => {

    let products = await user.findAll({})
    res.status(200).send(products)

}

// 3. get single product

const getOneUser = async (req, res) => {

    let id = req.params.id
    let product = await user.findOne({
        where: {
            id: id
        }
    })
    res.status(200).send(product)

}

// 4. update Product

const updateUser = async (req, res) => {

    let id = req.params.id

    const alone = await user.update(req.body, {
        where: {
            id: id
        }
    })

    res.status(200).send(alone)


}

// 5. delete product by id

const deleteUser = async (req, res) => {

    let id = req.params.id

    await user.destroy({
        where: {
            id: id
        }
    })

    res.status(200).send('Product is deleted !')

}



const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find User if Exist
        const ujer = await user.findOne({
            where: {
                email: email
            }
        });
        // console.log(ujer)
        if (ujer) {
            // Verify Password
            // console.log(password, ujer.password);
            const isMatch = await bcrypt.compare(password, ujer.password);

            if (isMatch) {
                // Generate Token Which is Define in User Schema
                const token = generateToken(ujer);
                // console.log(token)
                res.cookie("jwt", token, {
                    // Expires Token in 24 Hours
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                })
                res.status(200).send("LoggedIn")
            } else {
                res.status(400).send("Invalid Credentials");
            }
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (error) {
        // console.log(error);
        res.status(400).send(error);
    }
}







module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    login,
    updateUser,
    deleteUser
}
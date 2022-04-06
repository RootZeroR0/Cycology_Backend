const {Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true,
        // },
        fname: {
            type: DataTypes.STRING,
        },
        lname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.NUMERIC,
        },
        gender: {
            type: DataTypes.STRING,
        },
        BirthDate: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.STRING
        },
    })

    return Product



}

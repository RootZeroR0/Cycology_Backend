module.exports = (sequelize, DataTypes) => {

    const Blog = sequelize.define("blog", {
        username: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT
        },
    })

    return Blog

}
const dbConfig = require('../config/dbConfig.js');
const { v4: uuidv4 } = require('uuid');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.blogs = require('./blogModel.js')(sequelize, DataTypes)
db.images = require("./image.model.js")(sequelize, Sequelize);
db.docs = require("./doc.model")(sequelize, Sequelize);


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

user_id = uuidv4()

// 1 to Many Relation

db.users.hasMany(db.blogs, {
    foreignKey: 'user_id',
    as: 'blog'
})

db.blogs.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user'
})



module.exports = db

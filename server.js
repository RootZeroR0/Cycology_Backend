const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('./models')
const { v4: uuidv4 } = require('uuid');
var flash = require('express-flash')
var session = require('express-session');
global.__basedir = __dirname;


const user = db.users
dotenv.config()

const app = express()

// middleware

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(flash());
app.use(session({ 
    secret: '123458cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


// routers
const router = require('./routes/userRouter.js')
const authenticate = require('./middleware/authenticate')
app.use('/api/users', router)

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



// Logout Page
app.get('/logout', (req, res)=>{
    res.clearCookie("jwt", {path : '/'})
    res.status(200).send("User Logged Out")
})

// Authentication
app.get('/auth', authenticate, (req, res)=>{

})

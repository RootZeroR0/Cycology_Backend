// import controllers blog, users
const user_dataController = require('../controllers/userController.js')
const Blog_Controller = require('../controllers/blogController')
const verify= require('../middleware/verifySignUp')
const email = require('../middleware/reset-password-email')
const emailsend = require('../middleware/update-password')
const uploadController = require("../controllers/uploadController");
const upload = require("../middleware/upload")
const docuploadController = require('../controllers/docuploadController')
const docupload = require('../middleware/docupload')

// router
const router = require('express').Router()



// use routers
router.post('/addUser', verify.checkDuplicateUsernameOrEmail, user_dataController.addUser)
router.post('/login', user_dataController.login)
router.get('/allUsers', user_dataController.getAllUsers)
router.post('/reset_email_password',email)
router.post('/update_password',emailsend)



// // Blog Url and Controller

router.get('/allBlogs', Blog_Controller.getAllBlogs)
router.post('/addblog/:id', Blog_Controller.addBlog)
router.get('/singleblog', Blog_Controller.getSingleBlog)




// Ujer router
router.get('/:id', user_dataController.getOneUser)
router.put('/:id', user_dataController.updateUser)
router.delete('/:id', user_dataController.deleteUser)


//Image and Document Router
router.post("/upload", upload.single("file"), uploadController.uploadFiles);
router.post("/uploadocuments", docupload.single("file"), docuploadController.uploadFiles2);

module.exports = router
const db = require('../models')

// model
const Blog = db.blogs


//1. Add Blog

const addBlog = async (req, res) => {

    const id = req.params.id

    let data = {
        user_id: id,
        username: req.body.fname,
        description: req.body.description
    }

    const bilog = await Blog.create(data)
    res.status(200).send(bilog)

}

// 2. Get All Blogs

const getAllBlogs = async (req, res) => {

    const bilogs = await Blog.findAll({})
    res.status(200).send(bilogs)

}

// 3. Get Single blog

const getSingleBlog = async (req, res) => {

    const bilogs = await Blog.findOne({ where: { id: id }})
    res.status(200).send(bilogs)

}

module.exports = {
    addBlog,
    getAllBlogs,
    getSingleBlog
}
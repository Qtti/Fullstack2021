const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

//const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
//const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

module.exports = mongoose.model('Blog', blogSchema)
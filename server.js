const express= require('express')
const mongoose= require('mongoose')
const Article = require('./models/article')
const articleRouter= require('./routes/articles')
const methodOverride= require('method-override')
const app= express()

mongoose.connect()  // here connect with your database by adding parameters

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles= await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles : articles})
})

app.use('/articles', articleRouter)

app.listen(3000, () => {
    console.log("server start on port 3000")
})
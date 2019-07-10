const express = require('express')
const router  = express.Router()
const Source  = require('../models/Source');
const Article = require('../models/Article')

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

// test route for styling
router.get('/homepages/article', (req, res) => {
  res.render('homepages/article')
})

router.get('/homepages/article/:id', (req, res) => {
  const { id } = req.params

  Article.find({ _id }).then(article => {
    console.log(article)
    res.render('homepages/article', { article })
  })
})

router.get('/article/:articleId', (req, res, next) => {
  console.log(req.params)
  Article.findById({_id: req.params.articleId}).then(article =>{
    res.render('homepages/article', { article });
  }).catch(err=>console.log(err));
 });

module.exports = router
const express = require('express')
const router  = express.Router()
const Source  = require('../models/Source');
const Article = require('../models/Article');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

router.get('/article/:articleId', (req, res, next) => {
  Article.findById({_id: req.params.articleId}).then(data =>{
    res.render('homepages/article', {data});
  }).catch(err=>console.log(err));
});

// test route for styling
router.get('/homepages/article', (req, res) => {
  res.render('homepages/article')
})

module.exports = router
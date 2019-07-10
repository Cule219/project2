const express = require('express')
const router  = express.Router()
const Source  = require('../models/Source');
const Article = require('../models/Article')
const Comment     = require('../models/Comment');
const axios = require('axios')

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

router.get('/article/:articleId', (req, res, next) => {
  Article.findById({ _id: req.params.articleId }).populate('comments').then(article =>{
    Source.find({ 'id': article.source.id }).then(source => {
      source = source[0]
      res.render('homepages/article', { article, source, user: req.user });
    })
  }).catch(err=>console.log(err));
});

// test route for styling
router.get('/homepages/article', (req, res) => {
  res.render('homepages/article')
})

//testing all comments route - will be used for rendering
router.get('/comments', (req, res, next) => {
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  Comment.find({article: (articleId)}).then(data => {
    return res.status(200).json(data);
  })
});

router.get('/article/:articleId', (req, res, next) => {
  console.log(req.params)
  Article.findById({_id: req.params.articleId}).then(article =>{
    res.render('homepages/article', { article });
  }).catch(err=>console.log(err));
 });

 

module.exports = router;


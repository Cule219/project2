const express = require('express')
const router  = express.Router()
const Source  = require('../models/Source');
const Article = require('../models/Article')
const Comment     = require('../models/Comment');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

router.get('/article/:articleId', (req, res, next) => {
  Article.findById({_id: req.params.articleId}).populate('comments').then(article =>{
    res.render('homepages/article', {article});
  }).catch(err=>console.log(err));
});

// test route for styling
router.get('/homepages/article', (req, res) => {
  res.render('homepages/article')
})

//testing all comments route
router.get('/comments', (req, res, next) => {
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  Comment.find({article: (articleId)}).then(data => {
    res.render(homepages/article);
  return res.status(204).send();
  })
});

router.get('/article/:articleId', (req, res, next) => {
  console.log(req.params)
  Article.findById({_id: req.params.articleId}).then(article =>{
    res.render('homepages/article', { article });
  }).catch(err=>console.log(err));
 });
module.exports = router;




// router.get('/homepages/article/:id', (req, res) => {
//   const { id } = req.params

//   Article.find({ _id }).then(article => {
//     console.log(article)
//     res.render('homepages/article', { article })
//   })
// })
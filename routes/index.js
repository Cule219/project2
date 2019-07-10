const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const Article     = require('../models/Article');

/* GET home page */
router.get('/', (req, res, next) => {
  Article.find({}).then(data =>{
    data.forEach(el => {
      el.title = el.title.substring(0, el.title.lastIndexOf('-'))
      el.publishDate = el.publishedAt.toDateString()
      console.log(el.publishedAt.toDateString())
    })
    let first = data.pop();
    res.render('index', {data, first, user: req.user});
  }).catch(err=>console.log(err));
 });

router.patch('/article', (req, res, next)=>{
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  let userId    = req.session.passport.user;
  Article.findByIdAndUpdate(mongoose.Types.ObjectId(articleId),
    {$set:{ratings: mongoose.Types.ObjectId(userId)}, $set:{$inc: {rating:1}}}
    ).then(data => {
      res.status(200).send(data);
  })
});

module.exports = router;

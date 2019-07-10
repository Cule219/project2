const express     = require('express');
const router      = express.Router();
const Article     = require('../models/Article');
const Handlebars  = require('handlebars');
const mongoose    = require('mongoose');

/* GET home page */
router.get('/', (req, res, next) => {
  Article.find({}).then(data =>{
    let first = data.pop();
    res.render('index', {data, first});
  }).catch(err=>console.log(err));
 });

router.patch('/article', (req, res, next)=>{
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  let userId    = req.session.passport.user;
  console.log(req.session);
  Article.findByIdAndUpdate(mongoose.Types.ObjectId(articleId),
    {$set:{ratings: mongoose.Types.ObjectId(userId)}, $set:{$inc: {rating:1}}}
    ).then(data => {
      console.log(data.length);
      res.status(200).send(data);
  })
});

module.exports = router;

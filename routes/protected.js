const express     = require("express");
const passport    = require('passport');
const router      = express.Router();
const User        = require("../models/User");
const Comment     = require('../models/Comment');
const Article     = require('../models/Article');
const mongoose    = require('mongoose');
//w5d3

const checksRole = role => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.redirect("/users");
    }
  };
};

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect("/login");
  };
};
router.use(loginCheck());



router.post('/comment', (req, res, next) => {
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  console.log(req.headers.referer);
  let userId = req.session.passport.user
  Comment.create({
    content: req.body.comment,
    author: userId,
    article: mongoose.Types.ObjectId(articleId)
  }).then(data => {
    //this needs to be done with post middleware
    Article.findByIdAndUpdate(
      mongoose.Types.ObjectId(articleId), 
      {$push: {'comments': mongoose.Types.ObjectId(data._id)}
    }).then(data => console.log(data.length));
    User.find({_id: userId}).then(user=>{
      res.status(200).send({data, user});
    });
}).catch(
    err =>console.log(err));
});

//use /\w+/ regex match here
router.patch('/article', (req, res, next)=>{
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  let userId    = req.session.passport.user;
  Article.findById(articleId).then(data => {
      let rating = data.rating + 1;
      let ratings = data.ratings;
      if(ratings.indexOf(userId) === -1){
        Article.updateMany(
          {_id: mongoose.Types.ObjectId(articleId)}, {
            rating: rating, 
            $push: {'ratings': userId},
            new: true
          }).then(data=>{
            res.status(200).send(data);
        });
      }
  })
});

module.exports = router;

// router.patch('/article', (req, res, next)=>{
//   let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
//   let userId    = req.session.passport.user;
//   Article.findByIdAndUpdate(mongoose.Types.ObjectId(articleId),
//     {$set:{ratings: mongoose.Types.ObjectId(userId)}}//, $set:{rating: 1}
//     ).then(data => {
      
//       res.status(200).send(data);
//   })
// });
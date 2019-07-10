const express     = require("express");
const passport    = require('passport');
const router      = express.Router();
const User        = require("../models/User");
const Comment     = require('../models/Comment');
const Article     = require('../models/Article');
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

router.post('/article/comment', (req, res, next) => {
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  let userId = req.session.passport.user
  Comment.create({
    content: req.body.comment,
    author: userId,
    article: articleId
  }).then(data => {
    Article.findOneAndUpdate({
      query:{_id: articleId}, 
      update:{$push: {comments: data._id}}
    });
    User.find({_id: userId}).then(user=>{
      res.status(200).send({data, user});
    });
}).catch(
    err =>console.log(err));
});

module.exports = router;
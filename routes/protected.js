const express     = require("express");
const passport    = require('passport');
const router      = express.Router();
const User        = require("../models/User");
const Comment     = require('../models/Comment');
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
  Comment.create({
    content: req.body.comment,
    author: req.session.passport.user,
    article: articleId
  }).then(data => {
    res.status(204).send();
}).catch(
    err =>console.log(err));
});

router.get('/article/comments', (req, res, next) => {
  console.log('sup')
  console.log(req.params);
  // Comment.find({article: ObjectId()}).then(data => {

  // })
});


module.exports = router;
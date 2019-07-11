const express     = require("express");
const passport    = require('passport');
const router      = express.Router();
const User        = require("../models/User");
const Comment     = require('../models/Comment');
const Article     = require('../models/Article');
const mongoose    = require('mongoose');
const Source      = require('../models/Source')
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


router.patch('/comment', (req, res, next)=>{
  let userId    = req.session.passport.user;
  Comment.findOne({'_id': req.body.commentId}, (err, doc)=>{
    console.log(doc)
    // if(doc.ratings.indexOf(userId) === -1){
    //   doc.ratings.push(userId);
    //   doc.rating++;
    // }else{
    //   doc.ratings.pull(mongoose.Types.ObjectId(userId));
    //   doc.rating--;
    // }
    //   doc.save(doc);
    //   if(err)console.log(err);
  })//.then(data => {res.send({rating: data.rating, liked: data.ratings.includes(req.session.passport.user)});
  // })
});

//use /\w+/ regex match here
router.patch('/article', (req, res, next)=>{
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
  let userId    = req.session.passport.user;
  Article.findOne({'_id': articleId}, (err, doc)=>{
    if(err)console.log(err);
    if(doc.ratings.indexOf(userId) === -1)
    {
      doc.ratings.push(userId);
      doc.rating++;
    }else{
      doc.ratings.pull(mongoose.Types.ObjectId(userId));
      doc.rating--;
    }
      doc.save(doc).then(data => {
        Source.findOne({'id': data.source.id}, (err, doc)=>{
          if(doc.ratings.indexOf(userId) === -1)
          {
            doc.ratings.push(userId);
            doc.reputation++;
          }else{
            doc.ratings.pull(mongoose.Types.ObjectId(userId));
            doc.reputation--;
          }
          doc.save(doc).then(cont => {
            res.send({rating: cont.reputation, liked: data.ratings.includes(req.session.passport.user)});
          })  
          if(err)console.log(err);
          })
    })  
  })
});

router.post('/comment', (req, res, next) => {
  let articleId = req.headers.referer.match(/[^\/]\w*$/)[0];
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



module.exports = router;


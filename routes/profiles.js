const express   = require('express')
const router    = express.Router();
const Source    = require('../models/Source');
const Articles  = require('../models/Article');
const User      = require('../models/User');


router.get('/source/:id', (req, res) =>{
  Source.find({'id': req.params.id}).then(data =>{
    Articles.find({'source.id': req.params.id}).then(articles =>{
      res.render('profile/source', {data, articles});
    });
  }).catch(err=>console.log(err));
});

router.get('/profile/user/:id',(req, res) => {
  User.findById({_id: req.params.id}).then(data => {
    let user = false; if(req.params.id == req.user._id) user =true;
    res.render('profile/user', {data, user});
  });
})

//Pauls test route
router.get('/profile/user',(req, res) => {
  const { user } = req.params
  res.render('profile/user')
})

module.exports = router

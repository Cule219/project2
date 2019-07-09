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

<<<<<<< HEAD
=======
router.get('/profile/source/:id', (req, res) => {
  const { source } = req.params

  res.render('homepages/sources/:id', { source })
})

// test route just for styling 
router.get('/profile/source', (req, res) => {
  const { source } = req.params

  res.render('homepages/sources')
})

>>>>>>> 58513dea2de65d7fce570445dcf2c42d200bb17c
module.exports = router

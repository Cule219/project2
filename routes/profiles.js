const express   = require('express')
const router    = express.Router();
const Source    = require('../models/Source');
const Articles  = require('../models/Article');
const User      = require('../models/User');


router.get('/source/:id', (req, res) => {
  Source.find({'id': req.params.id}).then(data =>{
    Articles.find({'source.id': req.params.id}).then(articles =>{
      data = data[0]

      res.render('profile/sourceProfile', { data, articles });
    });
  }).catch(err=>console.log(err));
});

router.get('/source/:id/edit', (req, res) => {
  Source.find({ 'id': req.params.id }).then(data => {
    Articles.find({'source.id': req.params.id}).then(articles =>{
      data = data[0]

      res.render('profile/editSourceProfile', { data, articles });
    });
  }).catch(err => console.log(err))
})

router.post('/profile/:id', (req, res) => {
  console.log('req body: ' + req.body.description)

  Source.updateOne({ 'id': req.params.id}, {
    'description': req.body.description,
    'politicalBias': req.body.politicalBias,
    'fundingSources': req.body.fundingSources
  }).then(data => {
    Source.find({ 'id': req.params.id}).then(data => {

      Articles.find({'source.id': req.params.id}).then(articles =>{
        data = data[0]
  
        res.render('profile/sourceProfile', { data, articles });
      });
    })
  }).catch(err => console.log(err))
})


router.get('/profile/user/:id',(req, res) => {
  User.findById({_id: req.params.id}).then(data => {
    let user = false; if(req.params.id == req.user._id) user =true;
    res.render('profile/user', {data, user});
  });
})


// test route just for styling 
router.get('/profile/source', (req, res) => {
  const { source } = req.params

  res.render('profile/sourceProfile')
})


module.exports = router

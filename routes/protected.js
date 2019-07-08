const express     = require("express");
const passport    = require('passport');
const router      = express.Router();
const User        = require("../models/User");


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


router.get('/profile/user',(req, res) => {
  const { user } = req.params

  res.render('profile/user')
})
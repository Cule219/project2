



const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect("/login");
  };
};
router.use(loginCheck());

const checksRole = role => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.redirect("/users");
    }
  };
};

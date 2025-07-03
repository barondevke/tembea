const requireLogin = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send({ message: "NOT AUTHENTICATED" });
    }
    next();
  };
  
module.exports = requireLogin;
  
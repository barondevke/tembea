// Middleware for protected routes
function checkAdminSession(req, res, next) {
  if (req.session.user.role!=="admin") return res.send("Unauthorized");
  next();
}


module.exports = checkAdminSession;

const withApiAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    return res.status(403).json({message:'Must be logged in'});
  } else {
    next();
  }
};

module.exports = withApiAuth;

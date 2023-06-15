const admin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send({ result: "Access Denied as admin!" });
  next();
};
module.exports = admin;

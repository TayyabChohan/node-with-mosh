const jwt = require("jsonwebtoken");
const config = require("config");
const auth = async (req, res, next) => {
  const isToken = req.header("x-header-auth");
  if (!isToken)
    return res.status(401).send({ result: "Access denied, No token Provided" });
  try {
    const decoded = jwt.verify(isToken, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(500).send({ result: "InValid teken" });
  }
};
module.exports = auth;

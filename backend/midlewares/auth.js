const jwt = require("jsonwebtoken");
const AuthecationError = require("../errors/authecation-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AuthecationError("Необходима авторизация!");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    next(new AuthecationError("Необходима авторизация!"));
  }

  req.user = payload;
  return next();
};

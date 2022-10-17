const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const auth = require("../midlewares/auth");
const notFoundRoute = require("../midlewares/notFoundRoute");

const { loginUserValidation, createUserValidation } = require("../midlewares/validation");

router.post("/signin", loginUserValidation, login);
router.post("/signup", createUserValidation, createUser);
router.use("/users", auth, require("./users"));
router.use("/cards", auth, require("./cards"));

router.use("*", auth, notFoundRoute);
module.exports = router;

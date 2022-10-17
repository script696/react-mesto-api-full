const router = require("express").Router();
const { getUserByIdValidation, updateUserValidation, updateAvatarUserValidation } = require("../midlewares/validation");

const {
  getUser,
  getUsers,
  updateMe,
  updateAvatar,
  getMe,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getMe);
router.get("/:id", getUserByIdValidation, getUser);
router.patch("/me", updateUserValidation, updateMe);
router.patch("/me/avatar", updateAvatarUserValidation, updateAvatar);

module.exports = router;

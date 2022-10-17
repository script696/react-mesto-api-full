const router = require("express").Router();
const { createCardValidation, searchCardIdValidation } = require("../midlewares/validation");

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCardValidation, createCard);
router.put("/:cardId/likes", searchCardIdValidation, likeCard);
router.delete("/:cardId/likes", searchCardIdValidation, dislikeCard);
router.delete("/:cardId", searchCardIdValidation, deleteCard);

module.exports = router;

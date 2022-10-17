const Card = require("../models/card");
const BadRequest = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-error");

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.send({ data: card });
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        next(new BadRequest());
        break;
      default:
        next(err);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const userId = req.user._id;
  const reqCard = req.params.cardId;
  try {
    const card = await Card.findById(reqCard).orFail(
      new NotFoundError("Карточка не найдена"),
    );
    const cardOwnerId = card.owner.toString();
    if (cardOwnerId === userId) {
      const deletedCard = await Card.findByIdAndDelete(reqCard);
      res.send({ data: deletedCard });
    } else {
      throw new ForbiddenError();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const likes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new NotFoundError("Карточка не найдена"));
    res.send({ data: likes });
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const likes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new NotFoundError("Карточка не найдена"));
    res.send({ data: likes });
  } catch (err) {
    next(err);
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequest = require("../errors/bad-request");
const AuthecationError = require("../errors/authecation-error");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-error");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  const reqUser = req.params.id;

  try {
    const user = await User.findById(reqUser).orFail(new NotFoundError("Пользователь не найден"));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send({
      data: {
        name, about, avatar, email,
      },
    });
  } catch (err) {
    if (err.code === 11000) next(new ConflictError("Польватель с такими данными уже существует"));
    switch (err.name) {
      case "ValidationError":
        next(new BadRequest("Введены некорректные данные"));
        break;
      default:
        next(err);
    }
  }
};

module.exports.updateMe = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(new NotFoundError("Пользователь не найден"));
    res.send({ data: user });
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        next(new BadRequest("Введены некорректные данные"));
        break;
      default:
        next(err);
    }
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.user._id,
    ).orFail(new NotFoundError("Пользователь не найден"));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const updatedAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    ).orFail(new NotFoundError("Пользователь не найден"));
    res.send({ data: updatedAvatar });
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        next(new BadRequest("Введены некорректные данные"));
        break;
      default:
        next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new AuthecationError("Неправильные почта или пароль");
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new AuthecationError("Неправильные почта или пароль");
    const token = jwt.sign({ _id: user._id }, "some-secret-key", { expiresIn: "7d" });
    res.send({ data: token });
  } catch (err) {
    next(err);
  }
};

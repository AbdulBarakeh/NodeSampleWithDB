const { NotExtended } = require("http-errors");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.register = async (req, res) => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  console.dir("mongoose connected.");
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  await user.setPassword(req.body.password);
  //If doc already exist do not insert again
  user.save(function (err) {
    if (err) {
      res.status(400).json({
        title: "Failed to create user account",
        detail: `Failed to create user account because: ${err.message}.`,
      });
    } else {
      const token = user.generateJwt();
      res.status(201).json({ token: token });
      // res.redirect("/index");
    }
  });
};
module.exports.login = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  }).catch((err) =>
    res.status(400).json({
      title: "Failed to find user account",
      detail: `Failed to find user account because: ${err.message}.`,
    })
  );
  if (user) {
    const valid = await user.validPassword(req.body.password);
    if (valid) {
      const token = user.generateJwt();
      res.status(200).json({
        token: token,
      });
      req.user = user;
      next();
      // res.redirect("/index");
    } else {
      res.status(401).json({
        title: "Unauthorized",
        detail: "Wrong password",
      });
    }
  } else {
    res.status(401).json({
      title: "Unauthorized",
      detail: "Wrong password",
    });
  }
};
module.exports.exsists = async function (req, res) {
  const user = await User.findOne({
    email: req.query.email,
  }).catch((err) => {});
  if (user) {
    res.status(200).json(false);
  } else {
    res.status(200).json(true);
  }
};

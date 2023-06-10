const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJs.AES.encrypt(req.body.password, process.env.HASH_KEY),
  });

  const savedUser = await newUser.save();

  try {
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  !user && res.status(401).json("wrong credentials");


  const hashedPassword = cryptoJs.AES.decrypt(
    user.password,
    process.env.HASH_KEY
  );
  const hashed = hashedPassword.toString(cryptoJs.enc.Utf8);
  hashed !== req.body.password && res.status(401).json("wrong credentials");

  const { password, ...others } = user._doc;

  try {
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

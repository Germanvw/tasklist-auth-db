const bcrypt = require("bcrypt");
const User = require("../Models/User");

const { generateJWT } = require("../helpers/jwt");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      // User already registered
      return res
        .status(400)
        .json({ status: false, msg: "User already registered" });
    }

    user = new User(req.body);

    // Hash password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // save
    await user.save();

    return res.status(201).json({
      status: true,
      msg: "User registered!",
      uid: user._id,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res.status(400).json({ status: false, msg: "User not found" });
    }

    // validate password

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      // invalid password
      return res.status(400).json({ status: false, msg: "Invalid password" });
    }

    //JWT
    const { _id, username } = user;
    const token = await generateJWT(_id, username);

    return res.json({ status: true, uid: _id, username, token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};

const renewToken = async (req, res) => {
  try {
    const { uid, username } = req;
    const token = await generateJWT(uid, username);
    return res.json({ ok: true, token, uid, username });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Error at the request." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};

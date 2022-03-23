const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  //x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "Authentication token doesnt exist",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.PRIVATE_KEY);

    // Guardo los datos importantes
    req.uid = uid;
    req.name = name;
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: false,
      msg: "Invalid token",
    });
  }

  next();
};

module.exports = { validateJWT };

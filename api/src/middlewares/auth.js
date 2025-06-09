const jwt = require("jsonwebtoken");

const validate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access Denied. No token provided." });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    req.user = payload; // Armazena as infos do token de forma segura
    next(); // Continua para o controller
  } catch (err) {
    return res
      .status(401)
      .send({ message: "Token inválido ou expirado", error: err.message });
  }
};

module.exports = validate;

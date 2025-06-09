const jsonwebtoken = require("jsonwebtoken");
const crypto = require("node:crypto");

const Login = (req, res) => {
  const { user, psw } = req.body;

  try {
    const correctPassword =
      user === "usuario@gmail.com" && psw === "123456789";

    if (!correctPassword) {
      return res.status(401).send({ message: "E-mail ou senha incorretos!" });
    }

    const token = jsonwebtoken.sign(
      {
        id: crypto.randomUUID(),
        name: "Fulano da Silva",
        avatar: "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
      },
      process.env.SECRET_JWT,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).send({ message: "Erro no servidor", error: err });
  }
};

module.exports = {
  Login
};

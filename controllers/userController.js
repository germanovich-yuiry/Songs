const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Basket } = require("../models/models");
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

// Simple in-memory blacklist (use a database or other solution in production)
const invalidatedTokens = new Set();

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("не указан емэйл или пароль"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким емайлом уже зарегистрирован")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь с таким именем не найден"));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async test(req, res) {
    res.json({ test: "test" });
  }

  async logout(req, res) {
    const token = req.header("Authorization").replace("Bearer ", "");
    invalidatedTokens.add(token);
    return res.json({ message: "Пользователь успешно вышел из системы." });
  }

  // Middleware to check if token is valid and not blacklisted
  async validateToken(req, res, next) {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (invalidatedTokens.has(token)) {
      return next(ApiError.unauthorized("Токен недействителен"));
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return next(ApiError.unauthorized("Неправильный токен"));
    }
  }
}

module.exports = new UserController();

const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");

const userController = require("../controllers/userController");

router.post("/sign-up", userController.registration);
router.post("/sign-in", userController.login);
router.get("/auth", authMiddleware, userController.check);
router.post("/log-out", userController.logout);

module.exports = router;

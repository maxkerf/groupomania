const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const authenticateUser = require("../middlewares/authenticateUser");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/users", authenticateUser, userCtrl.deleteUser);
router.get("/users/:id", authenticateUser, userCtrl.getOneUser);

module.exports = router;

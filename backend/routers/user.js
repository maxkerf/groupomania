const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const authenticateUser = require("../middlewares/authenticateUser");
const uploadImage = require("../middlewares/uploadImage");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/users", authenticateUser, userCtrl.deleteUser);
router.put(
	"/users/picture",
	authenticateUser,
	uploadImage,
	userCtrl.updateUserPicture
);
router.put("/users", authenticateUser, userCtrl.updateUser);
router.get("/users/:id", authenticateUser, userCtrl.getOneUser);

module.exports = router;

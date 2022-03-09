const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const authenticateUser = require("../middlewares/authenticateUser");

router.use(authenticateUser);
router.route("/").post(postCtrl.createPost).get(postCtrl.getAllPosts);

module.exports = router;

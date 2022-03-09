const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const authenticateUser = require("../middlewares/authenticateUser");

router.use(authenticateUser);
router.post("/", postCtrl.createPost);

module.exports = router;

const express = require("express");
const {
  createUser,
  getAllUsers
} = require('../controllers/user');
const { verifyToken, verifyUserIsAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, verifyUserIsAdmin, getAllUsers)

module.exports = router;

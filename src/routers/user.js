const express = require("express");
const {
  createUser,
  getAllUsers,
  deleteUser
} = require('../controllers/user');
const { verifyToken, verifyUserIsAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, verifyUserIsAdmin, getAllUsers)
router.delete("/:id", verifyToken, deleteUser)

module.exports = router;

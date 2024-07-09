const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createUserDb, getAllUsersDb, deleteUserDb } = require('../domains/user.js')

const createUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  try {
    const createdUser = await createUserDb(username, password)

    return res.status(201).json({ user: createdUser })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A user with the provided username already exists" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

const getAllUsers = async (req, res) => {
  const users = await getAllUsersDb()

  res.json({
    users
  })
}

const deleteUser = async (req, res) => {
  const userId = Number(req.params.id)

  if(req.user.role.name !== 'ADMIN' && req.user.id !== userId) {
    return res.status(403).json({
      error: 'User must be admin to delete another user'
    })
  }

  try {
    const deletedUser = await deleteUserDb(userId)

    return res.json({ user: deletedUser })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({ error: "No user found by this id" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  deleteUser
}

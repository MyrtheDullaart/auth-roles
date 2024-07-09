const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createPostDb, deletePostDb } = require('../domains/post.js')

const createPost = async (req, res) => {
  const {
    title,
    userId
  } = req.body

  if (!title || !userId) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  try {
    const createdPost = await createPostDb(title, userId)

    return res.status(201).json({ post: createdPost })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(409).json({ error: "A user with the provided ID does not exist" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

const deletePost = async (req, res) => {
  const postId = Number(req.params.id)

  try {
    const deletedPost = await deletePostDb(postId)

    return res.json({ post: deletedPost })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({ error: "A post with the provided ID does not exist" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  createPost,
  deletePost
}

const prisma = require('../utils/prisma')

const createPostDb = async (title, userId) => await prisma.post.create({
  data: {
    title,
    user: {
      connect: {
        id: userId
      }
    }
  }
})

const deletePostDb = async (postId, userId) => await prisma.post.delete({
  where: {
    id: postId,
    userId: userId
  }
})

module.exports = {
  createPostDb,
  deletePostDb
}

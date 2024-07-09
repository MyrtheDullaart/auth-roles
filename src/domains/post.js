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

const deletePostDb = async (postId) => await prisma.post.delete({
  where: {
    id: postId
  }
})

module.exports = {
  createPostDb,
  deletePostDb
}

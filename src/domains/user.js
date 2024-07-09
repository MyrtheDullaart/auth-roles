const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password) => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6)
  }
})

async function getAllUsersDb() {
  return await prisma.user.findMany()
} 

async function deleteUserDb(userId) {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  })
} 

module.exports = {
  createUserDb,
  getAllUsersDb,
  deleteUserDb
}

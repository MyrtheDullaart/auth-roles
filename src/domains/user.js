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

module.exports = {
  createUserDb,
  getAllUsersDb
}

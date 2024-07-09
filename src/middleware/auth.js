const prisma = require("../utils/prisma")
const jwt = require('jsonwebtoken')

async function verifyToken (req, res, next) {
    const authorization = req.headers.authorization

    if(!authorization) {
        return res.status(400).json({
            message: 'Authorization missing in headers'
        })
    }

    const [_, token] = authorization.split(' ')

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const foundUser = await prisma.user.findUnique({
            where: {
                id: decodedToken.sub
            }
        })

        if(!foundUser) {
            throw 'User not found'
        }

        req.user = foundUser
    } catch(e) {
        return res.status(401).json({
            message: 'Invalid credentials'
        })
    }

    next()
}

module.exports = {
    verifyToken
}
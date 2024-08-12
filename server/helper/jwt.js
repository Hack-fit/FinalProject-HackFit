const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

// console.log(JWT_SECRET,"!!!!!!");

const signToken = (userid)=>{
    return jwt.sign(userid, JWT_SECRET)
}
const verifyToken = (token)=>{
    return jwt.verify(token, JWT_SECRET)
}
module.exports = {signToken, verifyToken}
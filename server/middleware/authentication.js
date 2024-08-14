const { ObjectId } = require("mongodb")
const database = require("../config/mongodb")
const { verifyToken } = require("../helper/jwt")


async function authentication(req,res,next) {
    try {

        const token_access = req.headers.authorization
        // console.log(token_access)

        if (!token_access) {
            throw("Unauthorized")
        }

        const [Bearer,token] = token_access.split(" ")

        if (Bearer !== "Bearer") {
            throw("Unauthorized")
        }
        const verif = verifyToken(token)
        // console.log(verif.userid)

        if (!verif) {
            throw("Unauthorized")
        }

        const id = new ObjectId(String(verif.userid))
        // console.log(id)
        
        const user = await database.collection('users').findOne({_id:id})

        // console.log(user)

        if (!user) {
            throw("Unauthorized")
        }

        req.user = {
            userid:id,
            email:user.email,
            name:user.name,
        }

        next()


    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

module.exports = authentication
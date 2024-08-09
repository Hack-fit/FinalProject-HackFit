const { ObjectId } = require("mongodb")
const database = require("../config/mongodb")
const { verifyToken } = require("../helper/jwt")


async function authentication(req,res,next) {
    try {

        const token_access = req.headers.authorization
        // console.log(token_access)

        if (!token_access) {
            throw({name:"invalid token"})
        }

        const [Bearer,token] = token_access.split(" ")

        if (Bearer !== "Bearer") {
            throw({name:"invalid token"})
        }
        const verif = verifyToken(token)
        // console.log(verif)

        if (!verif) {
            throw({name:"invalid token"})
        }

        const id = new ObjectId(String(verif.id))
        // console.log(id)
        
        const user = await database.collection('users').findOne({_id:id})

        // console.log(user)

        if (!user) {
            throw({name:"invalid token"})
        }

        req.user = {
            userid:id,
            email:user.email
        }

        next()


    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

module.exports = authentication
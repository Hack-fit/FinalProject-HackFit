const database = require("../config/mongodb");

class UserController {
    static async getall(req,res){
        const data = await database.collection('users').find().toArray()
        // console.log(data)
        res.status(200).json(data)

    }

    static async register(req,res){
        try {
            const post = await database.collection('users').insertOne(req.body)
            
            res.status(201).json("successfully add user")

        } catch (error) {
            res.status(400).json({message:"failed"})
        }


    }
}

module.exports = UserController
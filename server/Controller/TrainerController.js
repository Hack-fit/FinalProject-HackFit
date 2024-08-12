const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class TrainerController{
    static async getalltrainer(req,res,next){
        try {
            const data = await database.collection('trainers').find().toArray()

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message:'failed'})
        }
    }

    static async getptbyid(req,res,next){
        try {
            const {id} = req.params
            // console.log(req.params)

            const data = await database.collection('trainers').findOne({_id:new ObjectId(String(id))})

            res.status(200).json(data)
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'failed'})
        }
    }
}

module.exports=TrainerController
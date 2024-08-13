const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");
const trainer = require("../model/trainer");

class TrainerController{
    static async getalltrainer(req,res,next){
        try {
            const data = await trainer.gettrainer()

            // console.log(data)

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({message:'failed'})
        }
    }

    static async getptbyid(req,res,next){
        try {
            const {id} = req.params
            const data = await trainer.gettrainerbyid(id)

            res.status(200).json(data)
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'failed'})
        }
    }
}

module.exports=TrainerController
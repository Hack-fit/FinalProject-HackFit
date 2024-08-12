const database = require("../config/mongodb")
const Training = require("../model/training")

class TrainingController {
    static async getTraining(req,res){
        try {
           const {userid} = req.user

            const data = await Training.getdata(userid)

           res.status(200).json(data)

        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports=TrainingController
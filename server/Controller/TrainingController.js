const { ObjectId } = require("mongodb")
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

    static async getTodo(req,res){
        try {
            const {userid} = req.user

            const data = await Training.getTodoList(userid)

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async deletetodo(req,res){
        try {
            const {id} = req.params

            const data = await Training.deletedata(id)

            res.status(200).json("successfully deleted todo")
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getCommunitytraining(req,res){
        try {
            const data = await Training.getCommunity()

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async likepost(req,res){
        try {
            const {userid} = req.user
            const {id} = req.params

            const data = await Training.likedPost(userid,id)

            res.status(200).json("successfully liked post")
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async gettodofrompost(req,res){
        try {
            const {userid} = req.user
            const {trainingid} = req.params

            const id_user = new ObjectId(String(userid))
            const training_id = new ObjectId(String(trainingid))

            await Training.insertConjunction({id_user,training_id})

            res.status(201).json("successfully get training")

        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports=TrainingController
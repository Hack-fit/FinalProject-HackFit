const { ObjectId } = require("mongodb")
const database = require("../config/mongodb")

class trainer {
    static async gettrainer(){
        try {
            const data = await database.collection('trainers').find().toArray()
            // console.log(data)
            return data
        } catch (error) {
            return error
        }
    }

    static async gettrainerbyid(id){
        try {
            const data = await database.collection('trainers').findOne({_id:new ObjectId(String(id))})

            if (!data) {
                throw { name: "trainer not found" }
            }

            return data
        } catch (error) {
            return error
        }
    }
}

module.exports = trainer
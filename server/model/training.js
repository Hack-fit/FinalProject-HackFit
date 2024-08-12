const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Training {
    static async getdata(id) {
        const agg = [
            {
              '$match': {
                '_id': new ObjectId(String(id))
              }
            }, {
              '$lookup': {
                'from': 'training', 
                'localField': '_id', 
                'foreignField': 'userid', 
                'as': 'traininglist'
              }
            }
          ];

           const data = await database.collection('users').aggregate(agg).toArray()

           return data
    }
}


module.exports = Training
const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Training {
    static async getdata(id) {

      try {
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
        
      } catch (error) {
        throw error
      }
    }

    static async getTodoList(id) {
      try {
        const agg = [
          {
            '$match': {
              '_id': new ObjectId(String(id))
            }
          }, {
            '$lookup': {
              'from': 'conjunction', 
              'localField': '_id', 
              'foreignField': 'userid', 
              'as': 'result'
            }
          }, {
            '$lookup': {
              'from': 'training', 
              'localField': 'result.trainingid', 
              'foreignField': '_id', 
              'as': 'todo'
            }
          },{
            '$unset': [
              'result', 'password'
            ]
          }
        ];
        
  
        const data = await database.collection('users').aggregate(agg).toArray()
        
        return data
      } catch (error) {
        throw error
      }
    
    }

    static async insertdata(data) {
      try {
        const insert = await database.collection('training').insertOne(data)
        return insert
      } catch (error) {
        throw error
      }
    }

    static async insertConjunction(data) {
      try {
        const insert = await database.collection('conjunction').insertOne(data)
        return insert
      } catch (error) {
        throw error
      }
    }
}


module.exports = Training
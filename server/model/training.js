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

    static async deletedata(id) {
      try {
        const checkauthor = await database.collection('conjunction').deleteOne({trainingid:new ObjectId(String(id))})
        return "successfully deleted"
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
        const checkTraining = await database.collection('conjunction').findOne({userid:data.id_user, trainingid:data.training_id})

        if (checkTraining) {
          throw "already get training"
        }

        const insert = await database.collection('conjunction').insertOne({userid:data.id_user, trainingid:data.training_id})
        return insert
      } catch (error) {
        throw error
      }
    }

    static async getCommunity() {
      try {

        const agg = [
          {
            '$lookup': {
              'from': 'users', 
              'localField': 'authorid', 
              'foreignField': '_id', 
              'as': 'user'
            }
          },{
            '$unset': [
              'user.password', 'user.token'
            ]
          }
        ];

        const data = await database.collection('Community').aggregate(agg).toArray()

        return data
      } catch (error) {
        throw error
      }
    }

    static async likedPost(userid,id) {
      try {

        const id_user = new ObjectId(String(userid))
        const id_post = new ObjectId(String(id))
        const checklike = await database.collection('Community').findOne({_id:id_post,'likes':{$elemMatch:{userid:id_user}}})
        if (checklike) {
          throw "already liked"
        }

        const like = await database.collection('Community').updateOne({_id:id_post}, {$push:{likes:{userid:id_user}}})

        return like
      } catch (error) {
        throw error
      }
    }
}


module.exports = Training
// require ('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kalaputra:wakacaw089@cluster0.flrujt1.mongodb.net/"
// console.log(uri, "<<<<<");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("hackfit-final-project")

module.exports = database

require ('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI
// console.log(uri, "<<<<<");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db(process.env.NODE_ENV === "test" ? "hackfit-final-project":process.env.DATABASE_NAME)

module.exports = database

//buatkan saya agar data didalam sini dapat menjalankan fitur testing dengan menggunakan jest
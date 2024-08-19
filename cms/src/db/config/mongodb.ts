import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.MONGO_URI as string
// console.log(uri, '');


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const db = client.db("hackfit-final-project")

export default db
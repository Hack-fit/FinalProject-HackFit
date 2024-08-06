const Booking = require("../models/Booking");


const typeDefs = `#graphql
    type Booking {
        userId:String
        PtId:String
        time:String
        session:String
        price:Int
    }

    type Query{
       Booking: [Booking]
      #  userbyid(userId:id):User
    }

    type Mutation{
        BookingPT(userid:String,PtId:String):String
    }
`;

const resolvers = {
    Query: {
        Booking: async () => {
            const data = await Booking.getall()
            return data
        }
    },

    Mutation : {
        BookingPT: async (parent,args,contextval) => {
            return "args"
        }
    }
}

module.exports = { typeDefs, resolvers };

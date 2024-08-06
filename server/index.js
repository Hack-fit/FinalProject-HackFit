const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
  } = require("./schemas/user");

  
const {
  typeDefs: BookTypeDefs,
  resolvers: bookResolvers,
} = require("./schemas/bookingSchema");

const server = new ApolloServer({
  typeDefs: [userTypeDefs,BookTypeDefs],
  resolvers: [userResolvers,bookResolvers],
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } =  startStandaloneServer(server, {
    listen: {port: process.env.PORT || 4001 },
    context:({req,res})=>{
      return{
        msg:'middleware',
        auth:()=>{
          const data = req.headers.authorization
        }
      }
    }
  
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
  } = require("./schemas/user");

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } =  startStandaloneServer(server, {
    listen: {port: process.env.PORT || 4001 } ,
  
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});

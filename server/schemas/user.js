const bcrypt = require("bcryptjs");
const User = require("../models/User");

const typeDefs = `#graphql
    type User{
        _id: ID
        name: String
        username: String!
        email: String!
        password: String!
        age: String!
        weight: String!
        height: String!
        bodyType: String!
    }
     input NewUser{
        name: String
        username: String
        email: String
        password: String
        age: String
        weight: String
        height: String
        bodyType: String
    }
    input loginUser{
        username: String
        password: String
    }

    type Query{
       user: [User]
      #  userbyid(userId:id):User
    }

    type Mutation{
        register(user: NewUser): User
        login(user: loginUser): String
        
    }
`;

const resolvers = {
  Query: {
    user: async () => {
      return "hello world";
    },
  },

  Mutation: {
    register: async (_, args) => {
      const newUser = { ...args.user };
      if (!newUser.password) throw new Error("Password is required");
      if (newUser.password.length < 5)
        throw new Error("Password must be more than 5 characther");
      var salt = bcrypt.genSaltSync(10);
      newUser.password = bcrypt.hashSync(newUser.password, salt);

      const result = await User.create(newUser);
      return result;
    },

    login: async (_, args) => {
    //   console.log(args, "Args Login<<<<<");
      const login = { ...args.login };
      const loginuser = await User.login(args);
      return loginuser;
    },
  },
};

module.exports = { typeDefs, resolvers };

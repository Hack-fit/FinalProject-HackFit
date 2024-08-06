const database = require("../config/mongodb");
const { compareSync } = require("bcryptjs");
const isEmail = require("../helper/isEmail");
const { signToken } = require("../helper/jwt");

class User {
  static Collection() {
    return database.collection("users");
  }

  static async validateUsername(username) {
    return await this.Collection("users").findOne({ username: username });
  }
  static async validateEmail(email) {
    return await this.Collection("users").findOne({ email: email });
  }

  static async create(newUser) {
    if (!newUser.username) throw new Error("Username required");
    const dataByUsername = await this.validateUsername(newUser.username);
    if (dataByUsername) throw new Error("Username must be unique!");

    if (!newUser.email) throw new Error("Email required");

    const emailFormat = isEmail(newUser.email);
    if (!emailFormat) throw new Error("Invalid email format");

    const dataByEmail = await this.validateEmail(newUser.email);
    if (dataByEmail) throw new Error("Email must be unique!");

    if (!newUser.age) throw new Error("Age required");
    if (!newUser.weight) throw new Error("Weight required");
    if (!newUser.height) throw new Error("Height required");
    if (!newUser.bodyType) throw new Error("Body Type required");

    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();

    const result = await this.Collection("users").insertOne(newUser);
    return newUser;
  }

  static async login(loginUser) {
    const { username, password } = loginUser.user;
    // console.log(username, password, "LOGIN USER")

    const login = await this.Collection("users").findOne({
      username: username,
    });
    // console.log(login, "LOGIN<><><><>");

    
    if (!login) {
      throw new Error("username not found");
    }
    // console.log(password, login.password, "FAREL GANTENG");
    
    const compPass = compareSync(password, login.password);
    // console.log(compPass, `9898989898`);
    
    if (!compPass) {
      throw new Error("username or Password is wrong");
    }

    const access_token = signToken({id: login.id, username: login.username});
    // console.log(access_token,`-----`);

    
    return access_token;
  }
}

module.exports = User;

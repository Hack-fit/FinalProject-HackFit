const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");
const isEmail = require("../helper/isEmail");
const { signToken } = require("../helper/jwt");
const openAi = require("../helper/openAi");
const bcrypt = require("bcryptjs");

class UserController {
  static async getall(req, res) {
    const data = await database.collection("users").find().toArray();
    // console.log(data)
    res.status(200).json(data);
  }

  static async register(req, res) {
    try {
      console.log(req.body, '<<<<');
      const user = req.body;

      if (user.name === "") {
        throw "name is required";
      }
      if (user.username === "") {
        throw "username is required";
      }

      const emailFormat = isEmail(user.email)
      if(!emailFormat){
        throw "email must be in email format"
      }

      const emailUnique = await database.collection("users").findOne({email: user.email});
      if(emailUnique){
        throw "email must be unique"
      }

      if (user.emai === "") {
        throw "email is required";
      }
      if (user.pasword === "") {
        throw "password is required";
      }
      if (user.age === "") {
        throw "age is required";
      }
      if (user.weight === "") {
        throw "weight is required";
      }
      if (user.height === "") {
        throw "height is required";
      }
      if (user.bodyType === "") {
        throw "body type is required";
      }

      var salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);

      const post = await database.collection("users").insertOne(user);

      res.status(201).json("successfully registered");
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
  
  static async registerPt(req, res) {
    try {
      const user = req.body;
      // console.log(user, '<<<<');

      if (user.name === "") {
        throw "name is required";
      }
      if (user.username === "") {
        throw "username is required";
      }

      const emailFormat = isEmail(user.email)
      if(!emailFormat){
        throw "email must be in email format"
      }

      const emailUnique = await database.collection("trainers").findOne({email: user.email});
      if(emailUnique){
        throw "email must be unique"
      }

      if (user.emai === "") {
        throw "email is required";
      }
      if (user.pasword === "") {
        throw "password is required";
      }
      if (user.age === "") {
        throw "age is required";
      }
      if (user.weight === "") {
        throw "weight is required";
      }
      if (user.height === "") {
        throw "height is required";
      }
      if (user.specialist === "") {
        throw "body type is required";
      }

      var salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);

      const post = await database.collection("trainers").insertOne(user);

      res.status(201).json("successfully register trainers");
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }

  static async login(req, res) {
    try {
      let { username, password } = req.body;
      if (!username) {
        throw { name : "username/password is invalid"};
      }
      const post = await database.collection("users").findOne({
        username: username,
      });

      if (!post) {
        throw {name:"username/password is invalid"}
      }

      let compare = bcrypt.compareSync(password, post.password);
      
      if (!compare) {
        throw { name: "Invalid username/password" };
      }

      let access_token = signToken(post);
      res.status(200).json({access_token});
      
    } catch (error) {
      console.log(error);
      res.status(400).json({error : error.name});
    }
  }

  static async finduserbyId(req,res,next){
    try {
      const {userid} = req.user
  
      const id = new ObjectId(String(userid))
      // console.log(id)
  
      const data = await database.collection('users').findOne({_id:id})
      // console.log(data)
  
      res.status(200).json(data)
      
    } catch (error) {
      res.status(400).json(error)
    }
  }

  static async openAi(req, res) {
    try {
      let responseOpenAI = await openAi();

      res.send(responseOpenAI);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;

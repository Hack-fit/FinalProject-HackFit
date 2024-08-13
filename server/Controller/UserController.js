const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");
const isEmail = require("../helper/isEmail");
const { signToken } = require("../helper/jwt");
const openAi = require("../helper/openAi");
const bcrypt = require("bcryptjs");
const user = require("../model/user");
const trainer = require("../model/trainer");
const Training = require("../model/training");

class UserController {
  static async getall(req, res) {
    const data = await user.getuser();
    // console.log(data)
    res.status(200).json(data);
  }

  static async getAllTrainers(req, res) {
    const data = await trainer.gettrainer();
    // console.log(data)
    res.status(200).json(data);
  }

  static async register(req, res) {
    try {
      const userinput = req.body;

      const data = await user.registeruser(userinput);

      res.status(201).json("successfully registered");
    } catch (error) {
      console.log(error);
      res.status(400).json({message:error});
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

      const emailFormat = isEmail(user.email);
      if (!emailFormat) {
        throw "email must be in email format";
      }

      const emailUnique = await database
        .collection("trainers")
        .findOne({ email: user.email });
      if (emailUnique) {
        throw "email must be unique";
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
      if (user.phoneNumber === "") {
        throw "Phone number is required";
      }
      if (user.bio === "") {
        throw "bio is required";
      }
      if (user.profile_picture === "") {
        throw "profile picture is required";
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

      const access_token = await user.loginuser(username, password);

      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  static async finduserbyId(req, res, next) {
    try {
      const { userid } = req.user;

      const data = await user.getuserbyid(userid);

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async openAi(req, res) {
    try {
      const {level, workoutFrequency, goal, equipment, name} = req.body
      const { userid } = req.user;
      // console.log(level,workoutFrequency,goal,equipment)
      
      const datauser = await user.getuserbyid(userid);
      console.log(datauser.token)
      if (datauser.token <= 0 || datauser.token === 0) {
        throw "Out of token please buy more to use this feature"; 
      }
      else if(datauser.token > 0){
        await user.updateToken(userid)
      }


      if (!level) {
        throw "data tidak boleh kosong";
      }
      if (!workoutFrequency) {
        throw "data tidak boleh kosong";
      }
      if (!goal) {
        throw "data tidak boleh kosong";
      }
      if (equipment === "" || []) {
        throw "data tidak boleh kosong"; 
      }


      let responseOpenAI = await openAi({level, workoutFrequency, goal, equipment});

      const training = {name,todo: JSON.parse(responseOpenAI)}

      const data = await Training.insertdata(training)
      console.log(data,"insert data training")

      const conjunctionData = await Training.insertConjunction({userid:new ObjectId(String(userid)), trainingid: data.insertedId})

      res.status(201).json({ message: "successfully created training" });
      // res.send(responseOpenAI);
    } catch (error) {
      console.log(error)
      if (error === "Out of token please buy more to use this feature") {
        console.log(error);
        res.status(400).json({message:error});
      }
      else{
        const { userid } = req.user;
        await user.updatetokenplus(userid)
        res.status(400).json({message:error});
      }

    }
  }

  static async updateuser(req, res) {
    try {
      const { userid } = req.user;
      const body = req.body;

      const data = await user.updateuser(userid, body);
      // console.log(data)

      res.status(201).json({ message: "successfully updated profile" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const {_id} = req.body;
      // console.log(body, "<><>");
     
      const data = await user.deleteUser(_id);
      console.log(data)

      if(!data){
        throw "user not found"
      }

      res.status(201).json({ message: "successfully deleted profile" });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }
}

module.exports = UserController;

const bcrypt = require("bcryptjs/dist/bcrypt");
const database = require("../config/mongodb");
const { signToken } = require("../helper/jwt");
const isEmail = require("../helper/isEmail");
const { ObjectId } = require("mongodb");

class user {
  static async getuser() {
    try {
      const data = await database.collection("users").find().toArray();
      return data;
    } catch (error) {
      return error;
    }
  }

  static async registeruser(data) {
    try {
      if (data.name === "") {
        throw "name is required";
      }
      if (data.username === "") {
        throw "username is required";
      }
      if (data.pasword === "" || !data.password) {
        throw "password is required";
      }
      const emailFormat = isEmail(data.email);
      if (!emailFormat) {
        throw "email must be in email format";
      }
      const emailUnique = await database
        .collection("users")
        .findOne({ email: data.email });
      if (emailUnique) {
        throw "email must be unique";
      }

      if (data.email === "") {
        throw "email is required";
      }
      if (data.age === "" || undefined) {
        throw "age is required";
      }
      if (data.gender === "") {
        throw "gender is required"
      }
      if (data.weight === "") {
        throw "weight is required";
      }
      if (data.height === "") {
        throw "height is required";
      }
      if (data.bodyType === "") {
        throw "body type is required";
      }
      if (data.phoneNumber === "") {
        throw "phone number is required";
      }
      if (data.password) {
        let salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
      }

      data.token = 2;
      data.imageurl = "https://static.vecteezy.com/system/resources/previews/004/991/321/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"

      const post = await database.collection("users").insertOne(data);

      return post;
    } catch (error) {
      throw error;
    }
  }

  static async loginuser(username, password) {
    try {
      console.log(username, password);
      const post = await database.collection("users").findOne({ username: username });

        // console.log(post)

      if (!post) {
        throw "Invalid username/password";
      }

      let compare = bcrypt.compareSync(password, post.password);

      if (!compare) {
        throw "Invalid username/password"
      }
      // console.log(post._id,"iduser")

      let access_token = signToken({ userid: post._id.toString() }); //id: user._id.toString(), email: user.email
      // console.log(access_token)

      return access_token;
    } catch (error) {
      throw error;
    }
  }

  static async getuserbyid(id) {
    try {
      const userid = new ObjectId(String(id));

      const data = await database.collection("users").findOne({ _id: userid });

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateToken(id) {
    try {
      const userid = new ObjectId(String(id));
      const data = await database
        .collection("users")
        .updateOne({ _id: userid }, { $inc: { token: -1 } });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updatetokenplus(id) {
    try {
      const userid = new ObjectId(String(id));
      const data = await database
        .collection("users")
        .updateOne({ _id: userid }, { $inc: { token: 1 } });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateuser(id, data) {
    try {
      const userid = new ObjectId(String(id));
      // console.log(data)
      data.updatedAt = new Date();

      const update = await database
        .collection("users")
        .updateOne({ _id: userid }, { $set: data });
      return update;
    } catch (error) {
      throw error;
    }
  }

  static async shareTrainingfromUser(userid, id) {
    try {
      const userId = new ObjectId(String(userid));
      const trainingId = new ObjectId(String(id));

      const checkTraining = await database.collection("training").findOne({ _id: trainingId });
      if (!checkTraining) {
        throw "training not found"
      }

      const checkpost = await database.collection("Community").findOne({ authorid: userId, trainingid: trainingId });
      if (checkpost) {
        throw "already shared"
      }

      const input = {
        authorid: userId,
        trainingid: trainingId,
        trainingname: checkTraining.name,
        likes:[],
        training: checkTraining.todo
      };


      const data = await database.collection("Community").insertOne(input);
      // console.log(data)

      return data;
    } catch (error) {
      throw error
    }
  }
}

module.exports = user;

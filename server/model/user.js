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

      if (data.emai === "") {
        throw "email is required";
      }
      if (data.pasword === "") {
        throw "password is required";
      }
      if (data.age === "") {
        throw "age is required";
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

      let salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);

      data.token = 2;

      const post = await database.collection("users").insertOne(data);

      return post;
    } catch (error) {
      return error;
    }
  }

  static async loginuser(username, password) {
    try {
      const post = await database
        .collection("users")
        .findOne({ username: username });
      // console.log(post)

      if (!post) {
        throw { name: "username/password is invalid" };
      }

      let compare = bcrypt.compareSync(password, post.password);

      if (!compare) {
        throw { name: "Invalid username/password" };
      }
      // console.log(post._id,"iduser")

      let access_token = signToken({ userid: post._id.toString() }); //id: user._id.toString(), email: user.email
      // console.log(access_token)

      return access_token;
    } catch (error) {
      return error;
    }
  }

  static async getuserbyid(id) {
    try {
      const userid = new ObjectId(String(id));

      const data = await database.collection("users").findOne({ _id: userid });

      return data;
    } catch (error) {
      return error;
    }
  }

  static async updateuser(id, data) {
    try {
      const userid = new ObjectId(String(id));
      // console.log(data)
      if (data.weight) {
        data.weight = data.weight + "kg";
      }
      if (data.height) {
        data.height = data.height + "cm";
      }

      data.updatedAt = new Date();

      const update = await database
        .collection("users")
        .updateOne({ _id: userid }, { $set: data });
      return update;
    } catch (error) {
      return error;
    }
  }
  static async deleteUser(id) {
    try {
      const userid = new ObjectId(String(id));

      const checkUser = await database.collection("users").findOne({ _id: userid });
      if(!checkUser){
          throw Error ("user not found")
      }
      
      const data = await database
        .collection("users")
        .deleteOne({ _id: userid });
      // console.log(data)


      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = user;

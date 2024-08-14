const { default: axios } = require("axios");
const database = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class BookingController {
  static async midtrans(req, res) {
    try {
      // console.log(req.user,`-----------123`);
      let token = 0;
      let gross_amount = 0;
      const { name, username, email, phone = "08222222" } = req.user;
      const { paket } = req.body;
      // console.log(paket,`------------`);

      if (paket === "hemat") {
        // console.log(paket,`------------`);
        (gross_amount = 10000),(token = 5);
      } else if (paket === "sedang") {
        gross_amount = 15000;
        token = 10;
      } else if (paket === "premium") {
        gross_amount = 20000;
        token = 20;
      }
      // console.log(gross_amount, token,`------------`);
      console.log(req.user.userid, `------------`);

      const check = await database.collection("transactions").insertOne({
        userId: req.user.userid,
        gross_amount: gross_amount,
        token: token,
        status: "pending",
      });

      // console.log(check.insertedId.toString(), `------------1234444`);

      const transactionDetails = {
        transaction_details: {
          order_id: check.insertedId,
          gross_amount: gross_amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: name,
          last_name: username,
          email: email,
          phone: phone,
        },
      };
        // console.log(transactionDetails,`9898989898`);

      const response = await axios.post(
        "https://api.sandbox.midtrans.com/v1/payment-links",
        transactionDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `SB-Mid-server-lEFDxEHKyL0KCw2pDErz4Df4` + ":"
            ).toString("base64")}`,
          },
        }
      );
      // console.log(response.data);

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async notification(req, res) {
    try {
      console.log(req.body, `-----------123`);
      const orderId = req.body.order_id.split("-")[0];
      if (
        req.body.transaction_status === `settlement` ||
        req.body.transaction_status === `capture`
      ) {
        await database
          .collection("transactions")
          .updateOne(
            { _id: new ObjectId(String(orderId)) },
            { $set: { status: "success" } }
          );
        const transaction = await database
          .collection("transactions")
          .findOne({ _id: new ObjectId(String(orderId)) });
        await database
          .collection("users")
          .updateOne(
            { _id: transaction.userId },
            { $inc: { token: transaction.token } }
          );
      } else {
        await database
          .collection("transactions")
          .updateOne(
            { _id: new ObjectId(String(orderId)) },
            { $set: { status: "Failed" } }
          );
      }

      res.status(200).json({ msg: "success" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports= BookingController;
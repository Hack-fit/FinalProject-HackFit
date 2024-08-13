const { default: axios } = require("axios");

class BookingController {
  static async midtrans(req, res) {
    try {
      console.log(req.user,`-----------123`);
      
      const { name, username, email, phone = "08222222"} = req.user;
      const { gross_amount= 10000, paket = 5 } = req.body;

      const transactionDetails = {
        transaction_details: {
          order_id: `order-${Math.floor(Math.random() * 1000000)}`,
          paket: `${paket} token`,
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
      //   console.log(transactionDetails,`9898989898`);

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
      console.log(response.data);

      res.status(200).json(response.data);
      //   console.log(response.data.token,`-------11111111111`);
      //   return response.data.token;
      //   res(200).json(response.data.token);
    } catch (error) {
      console.log(error);
    }
  }
  static async notification(req, res) {
    try {
      console.log(req.body,`-----------123`);
      res.status(200).json({ msg: "success" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BookingController;

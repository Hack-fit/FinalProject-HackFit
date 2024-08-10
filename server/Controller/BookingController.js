const { default: axios } = require("axios");

class BookingController {
  static async bookingPT(req, res, next) {
    const { userid } = req.user;
    const { PTid } = req.body;
  }
  static async midtrans(req, res) {
    try {
      const transactionDetails = req.body;
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

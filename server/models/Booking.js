const database = require("../config/mongodb");

class Booking {

    static async getall() {
        const data = await database.collection('booking').find().toArray()

        return data
    }
}

module.exports = Booking
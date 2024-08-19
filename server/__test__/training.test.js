require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const database = require("../config/mongodb");
const { test, expect, describe, beforeAll, afterAll } = require('@jest/globals');
var gtoken

beforeAll(async () => {
    const training = {
        "name": "Lower Strength",
        "todo": [
            {
                "day": "Senin",
                "Jenis_Latihan": "Latihan Kaki",
                "Rincian_Latihan": [
                    {
                        "jenisLatihan": "Leg Press",
                        "rep": 12,
                        "set": 3,
                        "tipe": "leg press"
                    },
                    {
                        "jenisLatihan": "Lunges dengan Dumbell",
                        "rep": 12,
                        "set": 3,
                        "tipe": "Lunges"
                    }
                ]
            },
            {
                "day": "Rabu",
                "Jenis_Latihan": "Latihan Punggung dan Bahu",
                "Rincian_Latihan": [
                    {
                        "jenisLatihan": "Lat Pulldown Machine",
                        "rep": 10,
                        "set": 3,
                        "tipe": ""
                    },
                    {
                        "jenisLatihan": "Rowing Machine",
                        "rep": 12,
                        "set": 3,
                        "tipe": ""
                    },
                    {
                        "jenisLatihan": "Shoulder Press dengan Dumbell",
                        "rep": 12,
                        "set": 3,
                        "tipe": ""
                    }
                ]
            },
            {
                "day": "Jumat",
                "Jenis_Latihan": "Latihan Dada dan Trisep",
                "Rincian_Latihan": [
                    {
                        "jenisLatihan": "Pec Deck Machine",
                        "rep": 12,
                        "set": 3,
                        "tipe": ""
                    },
                    {
                        "jenisLatihan": "Smith Machine Bench Press",
                        "rep": 10,
                        "set": 3,
                        "tipe": "bench press"
                    },
                    {
                        "jenisLatihan": "Cable Tricep Pushdown",
                        "rep": 15,
                        "set": 3,
                        "tipe": ""
                    }
                ]
            }
        ]
    }

    await database.collection("training").insertOne(training);

    const user = {
        
        "name": "Juan",
        "username": "Silvertr",
        "email": "juansil@mail.com",
        "password": "$2a$10$ep8hmMq9/DS9dsk4cpihd.JzzBxkddIyJkcU9MzODpW0nV55OpO66",
        "phoneNumber": "1236665980",
        "age": "23",
        "gender": "Male",
        "token": 1,
        "imageurl": "https://static.vecteezy.com/system/resources/previews/004/991/321/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
    }

    await database.collection('users').insertOne(user);


    const conjunction = {
        "userid":"66bd83dbbe9d43e59e9692df",
        "trainingid":"60d5c3d3c3c6c5b7c8f3d7d7"
    }
})


describe("TrainingController", () => {

    beforeAll(async () => {
        const credentials = { "username": "Silvertr", "password": "123456" };

        const res = await request(app).post("/login").send(credentials);
        gtoken = res.body.access_token;
    });

    test("should return all training", async () => {
        const response = await request(app).get("/get-training").set('authorization', `Bearer ${gtoken}`)
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toMatchObject({
            name: "Lower Strength"
        });
        console.log(response.body)
    })


}
)


afterAll(async () => {
    await database.collection("training").deleteMany({});
});
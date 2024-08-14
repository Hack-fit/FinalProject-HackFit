require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const database = require("../config/mongodb");
const UserController = require("../Controller/UserController");

beforeAll(async () => {
  // Insert dummy data into the database
  const user = {
    name: "bayuTestingedit324",
    username: "TestingBayu",
    email: "testing@mail.com",
    password: "$2a$10$wFp9Ejs7wp3subCdw3RKEeg9uTiwZkMALMsPof.bdDvotUnEc/qe6", // hashed password for "123456"
    age: "20",
    weight: "72",
    height: "171",
    bodyType: "mesomorph",
    createdAt: new Date(),
    updatedAt: new Date(),
    token: 8,
  };

  await database.collection("users").insertOne(user);
});

afterAll(async () => {
  await database.collection("users").deleteMany({});
});

describe("UserController", () => {
  describe("GET /user", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/user");

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toMatchObject({
        name: "bayuTestingedit324",
        username: "TestingBayu",
        email: "testing@mail.com",
      });
    });
  });

  describe("POST /login", () => {
    it("should log in a user", async () => {
      const credentials = {
        username: "TestingBayu",
        password: "123456", // Ensure this password matches the hashed one in the database
      };

      const response = await request(app).post("/login").send(credentials);

      expect(response.statusCode).toBe(200);
      expect(response.body.access_token).toBeDefined();
    });
  });

  describe("GET /user/:id", () => {
    it("should return a user by ID", async () => {
      const users = await database.collection("users").find().toArray();
      const userId = users[0]._id;

      const response = await request(app).get(`/user/${userId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body._id).toBe(userId);
    });
  });

  describe("PUT /user/:id", () => {
    it("should update a user by ID", async () => {
      const users = await database.collection("users").find().toArray();
      const userId = users[0]._id;

      const updatedUser = {
        name: "John Doe Updated",
        age: 26,
      };

      const response = await request(app)
        .put(`/user/${userId}`)
        .send(updatedUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("successfully updated profile");
    });
  });

  describe("DELETE /user/:id", () => {
    it("should delete a user by ID", async () => {
      const users = await database.collection("users").find().toArray();
      const userId = users[0]._id;

      const response = await request(app).delete(`/user/${userId}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("successfully deleted profile");
    });
  });
});
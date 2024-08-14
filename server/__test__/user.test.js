require("dotenv").config();

const request = require("supertest");
const express = require("express");
const database = require("../config/mongodb");

const app = require("../app");
const { ObjectId } = require("mongodb");

// Add missing import statements
const { MongoClient } = require("mongodb");

/**
 * Route /user
 * {
    "_id": "66b1ac4f2bf4892b25ab5509",
    "name": "bayuTestingedit324",
    "username": "TestingBayu",
    "email": "testing@mail.com",
    "password": "$2a$10$wFp9Ejs7wp3subCdw3RKEeg9uTiwZkMALMsPof.bdDvotUnEc/qe6",
    "age": "20",
    "weight": "72",
    "height": "171",
    "bodyType": "mesomorph",
    "createdAt": "2024-08-06T04:53:35.509Z",
    "updatedAt": "2024-08-13T07:17:53.545Z",
    "token": 8
  },
*/

//create test using super test and jest handle endpoint get /user
//create beforeAll to run before test
//insert dummy data to database
beforeAll(async () => {
  const user = {
    name: "bayuTestingedit324",
    username: "TestingBayu",
    email: "testing@mail.com",
    password: "$2a$10$wFp9Ejs7wp3subCdw3RKEeg9uTiwZkMALMsPof.bdDvotUnEc/qe6",
    age: "20",
    weight: "72",
    height: "171",
    bodyType: "mesomorph",
    createdAt: new Date(),
    updatedAt: new Date(),
    token: 8,
  };
  const trainer = {
    name: "GOAT 👑🐐",
    username: "ronaldo",
    email: "ronaldo@mail.com",
    password: "$2a$10$yZRhyiYbWqJ8x00qpwouh.Y8azszfeDauc5yk9XKIPltC.pWyNute",
    age: "24",
    weight: "80kg",
    height: "163cm",
    specialist: "zumba",
    phone_number: "081277219540",
    bio: "Greates of All Time 👑",
    profile_picture:
      "https://i.pinimg.com/564x/bf/9b/9d/bf9b9d50c27eeeeaddc433ac152f865a.jpg",
    role: "trainer\n",
  };

  await database.collection("users").insertOne(user);
  await database.collection("trainers").insertOne(trainer);
});

describe("GET /user", () => {
  it("responds with json and user data", async () => {
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

describe("POST /user", () => {
  it("responds with error for duplicate user", async () => {
    const response = await request(app).post("/user").send({
      name: "bayuTestingedit324",
      username: "TestingBayu",
      email: "testing@mail.com",
      password: "$2a$10$wFp9Ejs7wp3subCdw3RKEeg9uTiwZkMALMsPof.bdDvotUnEc/qe6",
      age: "20",
      weight: "72",
      height: "171",
      bodyType: "mesomorph",
      createdAt: new Date(),
      updatedAt: new Date(),
      token: 8,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("PUT /user", () => {
  it("responds with error for missing ID", async () => {
    const response = await request(app).put("/user").send({
      name: "bayuTestingedit324",
      username: "TestingBayu",
      email: "testing@mail.com",
      password: "$2a$10$wFp9Ejs7wp3subCdw3RKEeg9uTiwZkMALMsPof.bdDvotUnEc/qe6",
      age: "20",
      weight: "72",
      height: "171",
      bodyType: "mesomorph",
      createdAt: new Date(),
      updatedAt: new Date(),
      token: 8,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("GET /trainers", () => {
  it("should return all trainers", async () => {
    const response = await request(app).get("/trainers");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /register", () => {
  it("should register a new user", async () => {
    const user = {
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
      age: 25,
      weight: 70,
      height: 180,
      bodyType: "mesomorph",
    };

    const response = await request(app).post("/register").send(user);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe("successfully registered");
  });
});

describe("POST /registerPt", () => {
  it("should register a new personal trainer", async () => {
    const trainer = {
      name: "Jane Smith",
      username: "janesmith",
      email: "janesmith@example.com",
      password: "password123",
      age: 30,
      weight: 65,
      height: 170,
      specialist: "weight loss",
      phoneNumber: "1234567890",
      bio: "Certified personal trainer with 5 years of experience.",
      profile_picture: "profile.jpg",
    };

    const response = await request(app).post("/registerPt").send(trainer);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe("successfully register trainers");
  });
});

describe("POST /registerAdmin", () => {
  it("should register a new admin", async () => {
    const admin = {
      name: "Admin User",
      username: "adminuser",
      email: "adminuser@example.com",
      password: "password123",
    };

    const response = await request(app).post("/registerAdmin").send(admin);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe("successfully register admin");
  });
});

describe("GET /user/:id", () => {
  it("should return a user by ID", async () => {
    const user = await UserController.getall();
    const userId = user[0]._id;

    const response = await request(app).get(`/user/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(userId);
  });
});

describe("POST /openAi", () => {
  it("should create a training using OpenAI", async () => {
    const trainingData = {
      level: "beginner",
      workoutFrequency: "3 times a week",
      goal: "lose weight",
      equipment: ["dumbbells", "treadmill"],
      name: "Weight Loss Training",
    };

    const response = await request(app).post("/openAi").send(trainingData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("successfully created training");
  });
});

describe("PUT /user/:id", () => {
  it("should update a user by ID", async () => {
    const user = await UserController.getall();
    const userId = user[0]._id;

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
    const user = await UserController.getall();
    const userId = user[0]._id;

    const response = await request(app).delete(`/user/${userId}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("successfully deleted profile");
  });
});
describe("DELETE /user", () => {
  it("responds with success message on deletion", async () => {
    const user = await database
      .collection("users")
      .findOne({ username: "TestingBayu" });

    const response = await request(app).delete(`/user/${user._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "successfully deleted profile"
    );
  });
});
//create test using super test and jest handle failed endpoint

describe("GET /trainers/:id", () => {
  it("should return a trainer by ID", async () => {
    const trainers = await database.collection("trainers").find().toArray();
    const trainerId = trainers[0]._id;

    const response = await request(app).get(`/trainers/${trainerId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(trainerId);
  });
});

describe("PUT /trainers/:id", () => {
  it("should update a trainer by ID", async () => {
    const trainers = await database.collection("trainers").find().toArray();
    const trainerId = trainers[0]._id;

    const updatedTrainer = {
      name: "Jane Smith Updated",
      age: 31,
    };

    const response = await request(app)
      .put(`/trainers/${trainerId}`)
      .send(updatedTrainer);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("successfully updated profile");
  });
});

describe("DELETE /trainers/:id", () => {
  it("should delete a trainer by ID", async () => {
    const trainers = await database.collection("trainers").find().toArray();
    const trainerId = trainers[0]._id;

    const response = await request(app).delete(`/trainers/${trainerId}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("successfully deleted profile");
  });
});

describe("GET /admin/:id", () => {
  it("should return an admin by ID", async () => {
    const admins = await database.collection("admins").find().toArray();
    const adminId = admins[0]._id;

    const response = await request(app).get(`/admin/${adminId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(adminId);
  });
});

describe("PUT /admin/:id", () => {
  it("should update an admin by ID", async () => {
    const admins = await database.collection("admins").find().toArray();
    const adminId = admins[0]._id;

    const updatedAdmin = {
      name: "Admin User Updated",
    };

    const response = await request(app)
      .put(`/admin/${adminId}`)
      .send(updatedAdmin);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("successfully updated profile");
  });
});

describe("DELETE /admin/:id", () => {
  it("should delete an admin by ID", async () => {
    const admins = await database.collection("admins").find().toArray();
    const adminId = admins[0]._id;

    const response = await request(app).delete(`/admin/${adminId}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("successfully deleted profile");
  });
});

afterAll(async () => {
  await database.collection("users").deleteMany({});
  await database.collection("trainers").deleteMany({});
});

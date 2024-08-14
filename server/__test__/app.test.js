require("dotenv").config();

const request = require("supertest");
const express = require("express");
const database = require("../config/mongodb");

const app = require("../app");

beforeAll(async () => {
  // Insert dummy data into the database
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
  const trainers = {
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
  await database.collection("trainers").insertOne(trainers);
});

afterAll(async () => {
  await database.collection("users").deleteMany({});
  await database.collection("trainers").deleteMany({});
});
describe("POST /login", () => {
  it("should log in a user and return a token", async () => {
    const credentials = {
      username: "TestingBayu",
      password: "123456", // Ensure this password matches the hashed one in the database
    };

    const res = await request(app).post("/login").send(credentials);
    expect(res.statusCode).toEqual(200);
    expect(res.body.access_token).toBeDefined();
  });
});
describe("Authentication Middleware", () => {
  let token;

  beforeAll(async () => {
    const credentials = {
      username: "TestingBayu",
      password: "123456",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
  });

  it("should allow access to authenticated routes", async () => {
    const res = await request(app)
      .get("/profile") // Adjust the endpoint as necessary
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("should deny access to unauthenticated routes", async () => {
    const res = await request(app).get("/profile"); // Adjust the endpoint as necessary

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Unauthorized");
  });
});
describe("GET /", () => {
  it("should connect successfully", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("successfully connected");
  });
});

describe("GET /user", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/user");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /trainer", () => {
  it("should return all trainers", async () => {
    const res = await request(app).get("/trainer");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
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

    const res = await request(app).post("/register").send(user);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBe("successfully registered");
  });
});

describe("POST /register-pt", () => {
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

    const res = await request(app).post("/register-pt").send(trainer);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBe("successfully register trainers");
  });
});

describe("POST /register-admin", () => {
  it("should register a new admin", async () => {
    const admin = {
      name: "Admin User",
      username: "adminuser",
      email: "adminuser@example.com",
      password: "password123",
    };

    const res = await request(app).post("/register-admin").send(admin);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBe("successfully register admin");
  });
});

describe("GET /trainers", () => {
  let token;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({ username: "TestingBayu", password: "123456" });
    token = loginRes.body.token;
  });
  // console.log(token, `TOKEN`);

  it("should return all trainers", async () => {
    const res = await request(app)
      .get("/trainers")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    console.log(res, `FARELL`);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

//   describe("POST /openai", () => {
//     it("should handle OpenAI request", async () => {
//       const res = await request(app).post("/openai").send({ prompt: "Hello, AI!" });
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toBeDefined();
//     });
//   });

describe("GET /profile", () => {
  let token;

  beforeAll(async () => {
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
  });

  it("should return user profile", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });
});

describe("PUT /update-user", () => {
  let token;

  beforeAll(async () => {
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
  });

  it("should update user profile", async () => {
    const updatedUser = {
      name: "John Doe Updated",
      age: 26,
    };

    const res = await request(app)
      .put("/update-user")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("successfully updated profile");
  });
});

describe("GET /trainer-detail/:id", () => {
  it("should return trainer details by ID", async () => {
    const trainers = await database.collection("trainers").find().toArray();
    const trainerId = trainers[0]._id;

    const res = await request(app).get(`/trainer-detail/${trainerId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body._id).toBe(trainerId);
  });
});

describe("GET /get-training", () => {
  let token;

  beforeAll(async () => {
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
  });

  it("should return training data", async () => {
    const res = await request(app)
      .get("/get-training")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });
});

describe("GET /get-todo", () => {
  let token;

  beforeAll(async () => {
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
  });

  it("should return todo list", async () => {
    const res = await request(app)
      .get("/get-todo")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });
});

// delete user all data for after all
// afterAll(async () => {
//   await database.collection("users").deleteMany({});
//   await database.collection("trainers").deleteMany({});
// });

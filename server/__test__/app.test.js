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
  const data = await database.collection("users").insertOne(user);
  // const userId = data.insertedId;
  // const todo = {
  //   title: "Sample Todo",
  //   description: "This is a sample todo",
  //   userId: userId,
  // };

  // await database.collection("todos").insertOne(todo);
  await database.collection("trainers").insertOne(trainers);
});

afterAll(async () => {
  await database.collection("users").deleteMany({});
  await database.collection("trainers").deleteMany({});
  await database.collection("transactions").deleteMany({});
  await database.collection("todos").deleteMany({});
  await database.collection("trainings").deleteMany({});
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
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
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

//create handle testing using jest and super test for get trainer by id
describe("GET /trainer-detail/:id", () => {
  let token;

  beforeAll(async () => {
    const credentials = {
      username: "TestingBayu",
      password: "123456",
    };

    const res = await request(app).post("/login").send(credentials);
    // console.log(res.body, `RES BODY`);
    token = res.body.access_token;
    // console.log(token, `TOKEN`);
  });
  //   console.log(token, `TOKEN`);

  it("should return trainer by id", async () => {
    const trainers = await database.collection("trainers").find().toArray();
    const trainerId = trainers[0]._id;
    // const selection = trainerId.match(/'([^']+)'/)[1];
    // console.log(trainerId.toString(), `TOKEN-------`);
    // console.log(trainerId, `TRAINER ID`);

    const res = await request(app)
      .get(`/trainer-detail/${trainerId.toString()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body._id).toBe(trainerId.toString());
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
  it("should return training data failed dont have token", async () => {
    const res = await request(app)
      .get("/get-training")
      .set("Authorization", `Bearer ${token}1`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeDefined();
  });
});

//please create handle testing using jest and super test for get training by id condition failed because not have data

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
//create handle testing useng jest and super test for bookingController
describe("POST /midtrans", () => {
  let token;
  let orderId;

  beforeAll(async () => {
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
    // console.log(token, `TOKEN`);
  });

  it("should handle midtrans notification", async () => {
    const midtransData = {
      paket: "hemat",
    };

    const res = await request(app)
      .post("/midtrans")
      .set("Authorization", `Bearer ${token}`)
      .send(midtransData);
    // console.log(res.body.message, `RES BODY`);

    orderId = res.body.order_id;

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    // expect(res.body.message).toBe(true);
  });
  it("should handle midtrans notification", async () => {
    const midtransData = {
      paket: "sedang",
    };

    const res = await request(app)
      .post("/midtrans")
      .set("Authorization", `Bearer ${token}`)
      .send(midtransData);
    // console.log(res.body.message, `RES BODY`);

    orderId = res.body.order_id;

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    // expect(res.body.message).toBe(true);
  });
  it("should handle midtrans notification", async () => {
    const midtransData = {
      paket: "premium",
    };

    const res = await request(app)
      .post("/midtrans")
      .set("Authorization", `Bearer ${token}`)
      .send(midtransData);
    // console.log(res.body.message, `RES BODY`);

    orderId = res.body.order_id;

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    // expect(res.body.message).toBe(true);
  });
  it("should handle midtrans notification", async () => {
    {
      // handle POST /notification-payment
      // midtrans payload notification
      const midtransData = {
        order_id: orderId,
        transaction_status: "settlement",
      };

      const res = await request(app)
        .post("/notification-payment")
        .send(midtransData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
    }
  });
});

//create handle testing useing jest and super test for openai controller for data can get same from openai.js
describe("POST /openai", () => {
  let token;

  beforeAll(async () => {
    const user = {
      name: "bayuTestingedit324",
      username: "testingopenai",
      email: "testing_openai@mail.com",
      password: "$2a$10$wFp9Ejs7wp3subCdw3RKEeg9uTiwZkMALMsPof.bdDvotUnEc/qe6",
      age: "20",
      weight: "72",
      height: "171",
      bodyType: "mesomorph",
      createdAt: new Date(),
      updatedAt: new Date(),
      token: 8,
    };
    const data = await database.collection("users").insertOne(user);
    const credentials = {
      username: "testingopenai",
      password: "123456",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
  });
  // afterAll(async () => {
  //   await database.collection("users").deleteOne({username: "testingopenai"});
  // });

  // console.log(token, `TOKEN`);

  it("should handle OpenAI request", async () => {
    const openaiData = {
      level: "beginner",
      workoutFrequency: "1",
      goal: "weight loss",
      equipment: ["dumbbell"],
      name: "TestingBayu",
    };

    const res = await request(app)
      .post("/openai")
      .set("Authorization", `Bearer ${token}`)
      .send(openaiData);
    // console.log(await res.body, `RES BODY`);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined();
  }, 10000);
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
  it("should get all todo items", async () => {
    const res = await request(app)
      .get("/get-todo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /community", () => {
  let token;

  beforeAll(async () => {
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    const res = await request(app).post("/login").send(credentials);
    token = res.body.access_token;
  });
  it("should get community training data", async () => {
    const res = await request(app)
      .get("/community")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
  });
});
describe("DELETE /delete-todo/:id", () => {
  let token;
  let todoId;
  beforeAll(async () => {
    const credentials = {
      username: "TestingBayu",
      password: "123456",
    };
    const res = await request(app).post("/login").send(credentials);
    const todo = {
      title: "Sample Todo",
      description: "This is a sample todo",
      userId: res.body.userId,
    };
    const data = await database.collection("todos").insertOne(todo);
    todoId = data.insertedId;
    token = res.body.access_token;
    // console.log(data, `DATA`);
  });

  it("should delete a todo", async () => {
    const res = await request(app)
      .delete(`/delete-todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(res, `RES BODY`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body).toBe("successfully deleted todo");
  });
});
describe("GET /get-shared-todo/:trainingid", () => {
  let token;
  let trainingId;

  beforeAll(async () => {
    const credentials = {
      username: "johndoe",
      password: "password123",
    };

    // Log in to get the token
    const loginRes = await request(app).post("/login").send(credentials);
    token = loginRes.body.access_token;

    // Insert a training to get a valid trainingId
    const training = {
      title: "Sample Training",
      description: "This is a sample training",
      date: new Date(),
    };
    const trainingRes = await database
      .collection("trainings")
      .insertOne(training);
    trainingId = trainingRes.insertedId;
  });

  afterAll(async () => {
    // Clean up the inserted training
    await database.collection("trainings").deleteOne({ _id: trainingId });
  });

  it("should return shared todo for a valid training ID", async () => {
    const res = await request(app)
      .get(`/get-shared-todo/${trainingId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(false);
  });

  it("should return 404 for an invalid training ID", async () => {
    const invalidTrainingId = "invalidTrainingId";
    const res = await request(app)
      .get(`/get-shared-todo/${invalidTrainingId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
    // expect(res.body).toHaveProperty("error", "Training not found");
  });
});
// delete user all data for after all
// afterAll(async () => {
//   await database.collection("users").deleteMany({});
//   await database.collection("trainers").deleteMany({});
// });

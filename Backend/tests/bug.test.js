import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import bugRoutes from "../routes/bugRoutes.js";
import Bug from "../models/Bug.js";

const app = express();
app.use(express.json());
app.use("/api/bugs", bugRoutes);

beforeAll(async () => {
  const uri = "mongodb://127.0.0.1:27017/bugtracker-test";
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Bug API", () => {
  it("should create a new bug", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "Test Bug", description: "Test Description" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Bug");
  });

  it("should get all bugs", async () => {
    const res = await request(app).get("/api/bugs");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

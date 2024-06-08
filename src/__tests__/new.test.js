import { app } from "../app";
import request from "supertest";
describe('POST /auth/login', () => {
  describe("given an email and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/v1/auth/login").send({
        email: "test@test.com",
        password: "password123"
      })
      expect(response.statusCode).toBe(200);
    })
  })

  describe("when the email and password are missing", () => {

  })
})

/* eslint-disable no-undef */
/* ↑↑ Don't remove it ↑↑ */

const request = require("supertest");
const { app } = require("../src/app");
const DataSource = require("../src/database/dataSource");

// Hooks:
// beforeAll(async () => {})
// beforeEach(async () => {})
// afterAll(async () => {})
// afterEach(async () => {})

beforeAll(async () => {
  // Start database connection.
  await DataSource.$connect();
});

afterAll(async () => {
  // Destroy database connection.
  await DataSource.$disconnect();
});

describe("Grouping tests together", () => {
  test("OK", async () => {
    let result = await request(app).get("/resources");
    expect(result.status).toBe(200);
  });

  test("Not OK", async () => {
    let result = await request(app).get("/resources");
    expect(result.status).toBe(400);
  });
});
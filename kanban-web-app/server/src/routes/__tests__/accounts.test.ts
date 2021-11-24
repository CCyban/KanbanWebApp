// General Testing Imports
import app, { server } from '../../index'
import { dbConnection } from '../../services/database.service'
import request from "supertest"

// Classes for the tests to use
import { CAccount } from '../../classes/CAccount'

// Test data for the tests to use
const someUsername: string = "34e3cb31-7114-47ca-8217-7d60416a1bfc";
const somePassword: string = "29943fab-0e35-419c-b7ee-de952d54e44d";
const anotherUsername: string = "9921e203-0672-4dba-a360-c537f05d98f7";
const anotherPassword: string = "9cefda50-cd62-4018-b45d-18146fa0d4f3";

export let accountToken: string; // Exported so the kanban tests can grab hold of a valid token


describe("POST /accounts", () => {
    it("Returns status 201 if an account is created", async () => {

        const res = await request(app)
            .post("/accounts")
            .send(new CAccount(someUsername, somePassword));
        expect(res.statusCode).toEqual(201);
    })
});

describe("POST /accounts", () => {
    it("Returns status 409 if cannot create an account with a already-used username", async () => {

        const res = await request(app)
            .post("/accounts")
            .send(new CAccount(someUsername, somePassword));
        expect(res.statusCode).toEqual(409);
    })
});

describe("POST /accounts/token", () => {
    it("Returns status 200 if the POST data was valid to return a token", async () => {

        const res = await request(app)
            .post("/accounts/token")
            .send(new CAccount(someUsername, somePassword));
        expect(res.statusCode).toEqual(200);
        expect(res.body.accountToken).toBeTruthy;
        accountToken = res.body.accountToken;
    })
});

describe("POST /accounts/token", () => {
    it("Returns status 404 if the POST data was invalid to return a token", async () => {

        const res = await request(app)
            .post("/accounts/token")
            .send(new CAccount(anotherUsername, somePassword));
        expect(res.statusCode).toEqual(404);
        expect(res.body.accountToken).toBeFalsy;
    })
});

describe("PUT /accounts", () => {
    it("Returns status 200 if the password change was successful with valid token", async () => {

        const res = await request(app)
            .put("/accounts")
            .send({ newPassword: anotherPassword })
            .set("Authorization", accountToken);
        expect(res.statusCode).toEqual(200);
    })
});


describe("PUT /accounts", () => {
    it("Returns status 401 if the password change was unsuccessful with invalid token", async () => {

        const res = await request(app)
            .put("/accounts")
            .send({ newPassword: anotherPassword });
        expect(res.statusCode).toEqual(401);
    })
});

describe("DELETE /accounts", () => {
    it("Returns status 200 if the deletion was successful with a valid token", async () => {

        const res = await request(app)
            .delete("/accounts")
            .send(new CAccount(someUsername, anotherPassword))
            .set("Authorization", accountToken);
        expect(res.statusCode).toEqual(200);
    })
});

describe("DELETE /accounts", () => {
    it("Returns status 401 if the deletion was unsuccessful with a invalid token", async () => {

        const res = await request(app)
            .delete("/accounts")
            .send(new CAccount(someUsername, anotherPassword));
        expect(res.statusCode).toEqual(401);
    })
});

afterAll(async () => {
    // Gracefully dispose of API services server and database connection
    await server.close();
    await dbConnection.close();
});
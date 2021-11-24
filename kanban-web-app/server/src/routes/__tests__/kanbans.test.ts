import app, { server } from '../../index'
import { dbConnection } from '../../services/database.service'

import request from "supertest"
import { CKanban } from '../../classes/CKanban';
import { CKanbanSection } from '../../classes/CKanbanSection';
import { CKanbanSectionCard } from '../../classes/CKanbanSectionCard';
import { CKanbanCardComment } from '../../classes/CKanbanCardComment';


// Test data for the tests to use
import { accountToken } from './accounts.test';
let newKanbanId: string;
let fetchedKanbans: Array<CKanban>;


const someKanban: CKanban = new CKanban(
    "Sprint 13.3.8000",
    [
        new CKanbanSection(
            "TODO",
            [
                new CKanbanSectionCard(
                    "WebApp > SignIn page > SignIn Button greyed out",
                    "The sign in button no longer works",
                    3,
                    "4 hours",
                    "Zahra Ulf",
                    "Rian Letty",
                    "17/03/20",
                    "26/07/20",
                    [
                        new CKanbanCardComment(
                            "Can someone put an estimate on this?",
                            "Development Manager",
                            "24/07/20"
                        )
                    ]
                )
            ]
        ),
    ]
)

const someOtherKanban: CKanban = new CKanban(
    "Sprint 13.3.8000",
    [
        new CKanbanSection(
            "TODO",
            [
                new CKanbanSectionCard(
                    "WebApp > SignIn page > SignIn Button greyed out",
                    "The sign in button no longer works",
                    3,
                    "4 hours",
                    "Zahra Ulf",
                    "Rian Letty",
                    "17/03/20",
                    "26/07/20",
                    [
                        new CKanbanCardComment(
                            "Can someone put an estimate on this?",
                            "Development Manager",
                            "24/07/20"
                        ),
                        new CKanbanCardComment(
                            "An estimate has been added from the recent sprint planning.",
                            "Scrum Master",
                            "26/07/20"
                        )
                    ]
                )
            ]
        ),
        new CKanbanSection(
            "DEV",
            [
                new CKanbanSectionCard(
                    "WebApp > Kanban page > Cannot create kanbans",
                    "The create kanban button no longer works",
                    3,
                    "6 hours",
                    "Zahra Ulf",
                    "Rian Letty",
                    "27/06/20",
                    "26/07/20",
                    [
                        new CKanbanCardComment(
                            "Can this be done by the next release?",
                            "Product Manager",
                            "02/07/20"
                        ),
                        new CKanbanCardComment(
                            "This has been added to the current sprint with a fresh estimate.",
                            "Scrum Master",
                            "26/07/20"
                        )
                    ]
                )
            ]
        )
    ]
)

describe("POST /kanbans", () => {
    it("Returns status 201 if a kanban is successfully created with a valid token", async () => {

        const res = await request(app)
            .post("/kanbans")
            .send(someKanban)
            .set("Authorization", accountToken);

        expect(res.statusCode).toEqual(201);

        expect(res.body._id).toBeTruthy;
        newKanbanId = res.body._id;
    })
});


describe("GET /kanban", () => {
    it("Returns status 200 with a body if kanbans are successfully fetched with a valid token", async () => {

        const res = await request(app)
            .get("/kanbans")
            .set("Authorization", accountToken);

        expect(res.statusCode).toEqual(200);

        expect(res.body).toBeTruthy;
        fetchedKanbans = res.body;
    })
});

describe("GET /kanbans", () => {
    it("Returns status 200 with a body if a specific kanban is successfully fetched with a valid token", async () => {

        const res = await request(app)
            .get("/kanbans/" + newKanbanId)
            .set("Authorization", accountToken);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy;
    })
});

describe("PUT /kanbans", () => {
    it("Returns status 200 with a body if a specific kanban is successfully updated with a valid token", async () => {

        const res = await request(app)
            .put("/kanbans/" + newKanbanId)
            .send(someOtherKanban)
            .set("Authorization", accountToken);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy;
    })
});

describe("DELETE /kanbans", () => {
    it("Returns status 200 with a body if a specific kanban is successfully deleted with a valid token", async () => {

        const res = await request(app)
            .delete("/kanbans/" + newKanbanId)
            .set("Authorization", accountToken);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy;
    })
});


afterAll(async () => {
    // Gracefully dispose of API services server and database connection
    await server.close();
    await dbConnection.close();
});
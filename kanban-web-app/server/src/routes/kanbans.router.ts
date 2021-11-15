// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { CKanban } from "../classes/CKanban";
import { CKanbanCardComment } from "../classes/CKanbanCardComment";
import { CKanbanSection } from "../classes/CKanbanSection";
import { CKanbanSectionCard } from "../classes/CKanbanSectionCard";

// Global Config
export const kanbansRouter = express.Router();

kanbansRouter.use(express.json());

// GET
kanbansRouter.get("/", async (_req: Request, res: Response) => {
    if (collections.kanbans != undefined) {
        try {
        const kanbans = (await collections.kanbans.find({}).toArray()) as CKanban[];

            res.status(200).send(kanbans);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
});

kanbansRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    if (collections.kanbans != undefined) {
        try {
            const query = { _id: new ObjectId(id) };
            const kanban = (await collections.kanbans.findOne(query)) as CKanban;

            if (kanban) {
                res.status(200).send(kanban);
            }
        } catch (error: any) {
            res.status(404).send(`Unable to find matching kanban with id: ${req.params.id}`);
        }
    }
});

// POST
kanbansRouter.post("/", async (req: Request, res: Response) => {
    if (collections.kanbans != undefined) {
        try {
            const newKanban = req.body as CKanban;

            const someKanban = new CKanban(
                "Some kanban title", 
                [
                    new CKanbanSection(
                        "TODO", 
                        [
                            new CKanbanSectionCard(
                                "Some card title", 
                                "Some card desc", 
                                73, 
                                "Some card est", 
                                "Some card author",
                                "Some card assignedTo",
                                "Some card date", 
                                "Some card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                            new CKanbanSectionCard(
                                "Some 2card title", 
                                "Some 2card desc", 
                                73, 
                                "Some 2card est", 
                                "Some 2card author",
                                "Some 2card assignedTo",
                                "Some 2card date", 
                                "Some 2card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                        ]
                    ),
                    new CKanbanSection(
                        "DEV", 
                        [
                            new CKanbanSectionCard(
                                "Some card title", 
                                "Some card desc", 
                                73, 
                                "Some card est", 
                                "Some card author",
                                "Some card assignedTo",
                                "Some card date", 
                                "Some card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                            new CKanbanSectionCard(
                                "Some 2card title", 
                                "Some 2card desc", 
                                73, 
                                "Some 2card est", 
                                "Some 2card author",
                                "Some 2card assignedTo",
                                "Some 2card date", 
                                "Some 2card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                            new CKanbanSectionCard(
                                "Some 3card title", 
                                "Some 3card desc", 
                                73, 
                                "Some 3card est", 
                                "Some 3card author",
                                "Some 3card assignedTo",
                                "Some 3card date", 
                                "Some 3card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            )
                        ]
                    ),
                    new CKanbanSection(
                        "DT", 
                        [
                            new CKanbanSectionCard(
                                "Some card title", 
                                "Some card desc", 
                                73, 
                                "Some card est", 
                                "Some card author",
                                "Some card assignedTo",
                                "Some card date", 
                                "Some card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                        ]
                    ),
                    new CKanbanSection(
                        "QA", 
                        [
                            new CKanbanSectionCard(
                                "Some card title", 
                                "Some card desc", 
                                73, 
                                "Some card est", 
                                "Some card author",
                                "Some card assignedTo",
                                "Some card date", 
                                "Some card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                            new CKanbanSectionCard(
                                "Some 2card title", 
                                "Some 2card desc", 
                                73, 
                                "Some 2card est", 
                                "Some 2card author",
                                "Some 2card assignedTo",
                                "Some 2card date", 
                                "Some 2card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                            new CKanbanSectionCard(
                                "Some 3card title", 
                                "Some 3card desc", 
                                73, 
                                "Some 3card est", 
                                "Some 3card author",
                                "Some 3card assignedTo",
                                "Some 3card date", 
                                "Some 3card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            )
                        ]
                    ),
                    new CKanbanSection(
                        "DONE", 
                        [
                            new CKanbanSectionCard(
                                "Some card title", 
                                "Some card desc", 
                                73, 
                                "Some card est", 
                                "Some card author",
                                "Some card assignedTo",
                                "Some card date", 
                                "Some card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                            new CKanbanSectionCard(
                                "Some 2card title", 
                                "Some 2card desc", 
                                73, 
                                "Some 2card est", 
                                "Some 2card author",
                                "Some 2card assignedTo",
                                "Some 2card date", 
                                "Some 2card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            ),
                            new CKanbanSectionCard(
                                "Some 3card title", 
                                "Some 3card desc", 
                                73, 
                                "Some 3card est", 
                                "Some 3card author",
                                "Some 3card assignedTo",
                                "Some 3card date", 
                                "Some 3card last", 
                                [
                                    new CKanbanCardComment(
                                        "This is a comment hi", 
                                        "Some randomo", 
                                        "02/11/08"
                                    ), 
                                    new CKanbanCardComment(
                                        "Some comment", 
                                        "Some Author", 
                                        "Some Date"
                                    )
                                ]
                            )
                        ]
                    )
                ]
            );
    

            console.log(someKanban);

            const result = await collections.kanbans.insertOne(someKanban);

            result
                ? res.status(201).send(`Successfully created a new kanban with id ${result.insertedId}`)
                : res.status(500).send("Failed to create a new kanban.");
        } catch (error: any) {
            console.error(error);
            res.status(400).send(error.message);
        }
    }
});

// PUT
kanbansRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    if (collections.kanbans != undefined) {
        try {
            const updatedKanban: CKanban = req.body as CKanban;
            const query = { _id: new ObjectId(id) };
        
            const result = await collections.kanbans.updateOne(query, { $set: updatedKanban });

            result
                ? res.status(200).send(`Successfully updated kanban with id ${id}`)
                : res.status(304).send(`Kanban with id: ${id} not updated`);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
});

// DELETE
kanbansRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    if (collections.kanbans != undefined) {
        try {
            const query = { _id: new ObjectId(id) };
            const result = await collections.kanbans.deleteOne(query);

            if (result && result.deletedCount) {
                res.status(202).send(`Successfully removed kanban with id ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove kanban with id ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Kanban with id ${id} does not exist`);
            }
        } catch (error: any) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
});
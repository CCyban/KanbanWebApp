// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { CKanban } from "../classes/CKanban";
import { kanbanSchema } from "../models/MKanban";
import { model } from "mongoose";
import jwt from 'jsonwebtoken';

// Global Config
export const kanbansRouter = express.Router();
kanbansRouter.use(express.json());

// GET kanbans
kanbansRouter.get("/", async (req: Request, res: Response) => {
    const token: string = req.headers["authorization"] ?? "";

    // Verifies token before proceeding with request
    jwt.verify(token, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', async (err) => {
        if (err) {
            // Invalid token, do not proceed with request
            // 401 = Unauthorized
            return res.status(401).send({ message: "Invalid token" });
        }
        else {
            // Valid token, should proceed with request
            if (collections.kanbans != undefined) {
                try {
                const kanbans = (await collections.kanbans.find({}).toArray()) as CKanban[];
                    // 200 = OK
                    res.status(200).send(kanbans);
                } catch (err: Error | any) {
                    // 500 = Internal Server Error
                    res.status(500).send(err?.message);
                }
            }
        }
        // Cannot find the collection in MongoDB
        // 500 = Internal Server Error
        return res.status(500).send();
    })
});

// GET kanban
kanbansRouter.get("/:id", async (req: Request, res: Response) => {
    const token: string = req.headers["authorization"] ?? "";

    jwt.verify(token, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', async (err) => {
        if (err) {
            // Invalid token, do not proceed with request
            // 401 = Unauthorized
            return res.status(401).send({ message: "Invalid token" });
        }
        else {
            // Valid token, should proceed with request
            const id = req?.params?.id;
            if (collections.kanbans != undefined) {
                try {
                    const query = { _id: new ObjectId(id) };
                    const kanban = (await collections.kanbans.findOne(query)) as CKanban;
        
                    if (kanban) {
                        // 200 = OK
                        res.status(200).send(kanban);
                    }
                } catch (error: Error | any) {
                    // 404 = Not Found
                    res.status(404).send(`Unable to find matching kanban with id: ${req.params.id}`);
                }
            }
        }
        // Cannot find the collection in MongoDB
        // 500 = Internal Server Error
        return res.status(500).send();
    })
});

// POST kanban
kanbansRouter.post("/", async (req: Request, res: Response) => {
    const token: string = req.headers["authorization"] ?? "";

    jwt.verify(token, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', async (err) => {
        if (err) {
            // Invalid token, do not proceed with request
            return res.status(401).send({ message: "Invalid token" });
        }
        else {
            // Valid token, should proceed with request
            if (collections.kanbans != undefined) {
                try {
                    // Validating the kanban request document against the schema
                    const newKanban = req.body as CKanban;
                    const kanbanModel = model('KanbanModel', kanbanSchema);
                    const kanbanDocument = new kanbanModel(newKanban);
                    await kanbanDocument.validate();

                    // Now that the validation passed without issue, can proceed with adding the new kanban to the collection
                    // 201 = Created
                    // 500 = Internal Server Error
                    const Result = await collections.kanbans.insertOne(kanbanDocument);
                    Result
                        ? res.status(201).send({ _id: Result.insertedId })
                        : res.status(500).send("Failed to create a new kanban.");

                } catch (err: Error | any) {
                    // 400 = Bad Request
                    res.status(400).send(err?.message);
                }
            }
            // Cannot find the collection in MongoDB
            // 500 = Internal Server Error
            return res.status(500).send();
        }
    })
});

// PUT kanban
kanbansRouter.put("/:id", async (req: Request, res: Response) => {
    const token: string = req.headers["authorization"] ?? "";

    jwt.verify(token, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', async (err) => {
        if (err) {
            // Invalid token, do not proceed with request
            // 401 = Unauthorized
            return res.status(401).send({ message: "Invalid token" });
        }
        else {
            // Valid token, should proceed with request
            const id = req?.params?.id;
            if (collections.kanbans != undefined) {
                try {
                    const updatedKanban: CKanban = req.body as CKanban;
                    const query = { _id: new ObjectId(id) };

                    // Removes the MongoDB _id when updating an item so it does not conflict
                    if (updatedKanban._id) {
                        delete updatedKanban._id;
                    }
                
                    // 200 = OK
                    // 304 = Not Modified
                    const result = await collections.kanbans.updateOne(query, { $set: updatedKanban });
                    result
                        ? res.status(200).send(`Successfully updated kanban with id ${id}`)
                        : res.status(304).send(`Kanban with id: ${id} not updated`);
                } catch (err: Error | any) {
                    // 400 = Bad Request
                    res.status(400).send(err?.message);
                }
            }
            // Cannot find the collection in MongoDB
            // 500 = Internal Server Error
            return res.status(500).send();
        }
    })
});

// DELETE kanban
kanbansRouter.delete("/:id", async (req: Request, res: Response) => {
    const token: string = req.headers["authorization"] ?? "";

    jwt.verify(token, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', async (err) => {
        if (err) {
            // Invalid token, do not proceed with request
            // 401 = Unauthorized
            return res.status(401).send({ message: "Invalid token" });
        }
        else {
            // Valid token, should proceed with request
            const id = req?.params?.id;

            if (collections.kanbans != undefined) {
                try {
                    const query = { _id: new ObjectId(id) };
                    const result = await collections.kanbans.deleteOne(query);

                    if (result && result.deletedCount) {
                        // 200 = OK
                        res.status(200).send(`Successfully removed kanban with id ${id}`);
                    } else if (!result) {
                        // 400 = Bad Request
                        res.status(400).send(`Failed to remove kanban with id ${id}`);
                    } else if (!result.deletedCount) {
                        // 404 = Not Found
                        res.status(404).send(`Kanban with id ${id} does not exist`);
                    }
                } catch (err: Error | any) {
                    // 400 = Bad Request
                    res.status(400).send(err?.message);
                }
            }
            // Cannot find the collection in MongoDB
            // 500 = Internal Server Error
            return res.status(500).send();
        }
    })
});
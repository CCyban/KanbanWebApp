// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { CKanban } from "../classes/CKanban";
import { CKanbanCardComment } from "../classes/CKanbanCardComment";
import { CKanbanSection } from "../classes/CKanbanSection";
import { CKanbanSectionCard } from "../classes/CKanbanSectionCard";
import { CKanbanSections } from "../classes/CKanbanSections";
import { CKanbanCardComments } from "../classes/CKanbanCardComments";
import { CKanbanSectionCards } from "../classes/CKanbanSectionCards";
import { kanbanSchema } from "../models/MKanban";
import { IKanban } from "../interfaces/IKanban";
import { model } from "mongoose";

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
            console.log(req.body as CKanban);

            const newKanban = req.body as CKanban;

            const kanbanModel = model('KanbanModel', kanbanSchema);

            const kanbanDocument = new kanbanModel(newKanban);

            await kanbanDocument.validate();

            const Result = await collections.kanbans.insertOne(kanbanDocument);

            Result
                ? res.status(201).send({ _id: Result.insertedId })
                : res.status(500).send("Failed to create a new kanban.");

        } catch (Error: any) {
            console.error(Error);
            res.status(400).send(Error.message);
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

            // Removes the MongoDB _id when updating an item so it does not conflict
            if (updatedKanban._id) {
                delete updatedKanban._id;
            }
        
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
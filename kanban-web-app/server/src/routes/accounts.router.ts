// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { accountSchema } from "../models/MAccount";
import { model } from "mongoose";
import { CAccount } from "@/classes/CAccount";
import jwt from 'jsonwebtoken';


// Global Config
export const accountsRouter = express.Router();

accountsRouter.use(express.json());

// POST account (creating account endpoint)
accountsRouter.post("/", async (req: Request, res: Response) => {
    if (collections.accounts != undefined) {
        try {
            // Validating the request data with the schema
            const Account = req.body as CAccount;
            const accountModel = model('AccountModel', accountSchema);
            const accountDocument = new accountModel(Account);
            await accountDocument.validate();


            // Existing username check before account creation
            const isUsernameAlreadyUsed = await collections.accounts.findOne({ Username: Account.Username }); 
            if (isUsernameAlreadyUsed) {
                // 409 = Conflict
                res.status(409).send("Username already exists");
            }
            else {
                // 201 = Created
                // 500 = Internal Server Error
                const Result = await collections.accounts.insertOne(accountDocument);
                Result
                    ? res.status(201).send()
                    : res.status(500).send("Failed to create a new account.");
            }

        } catch (err: Error | any) {
            // 400 = Bad Request
            res.status(400).send(err?.message);
        }
    }
});


// POST account data to get account token
accountsRouter.post("/token", async (req: Request, res: Response) => {
    if (collections.accounts != undefined) {
        try {
            // Validating the request data with the schema
            const Account = req.body as CAccount;
            const accountModel = model('AccountModel', accountSchema);
            const accountDocument = new accountModel(Account);
            await accountDocument.validate();


            // Existing username/password match check
            const doesExactAccountExist = await collections.accounts.findOne(Account);
            if (doesExactAccountExist) {
                // 200 = OK
                res.status(200).send({ accountToken: generateAccountToken(Account) })
            }
            else {
                // 404 = Not Found
                res.status(404).send(); 
            }
        } catch (err: Error | any) {
            // 400 = Bad Request
            res.status(400).send(err?.message);
        }
    }
});

// Generates an 12-hour token used for authentication and authorization 
function generateAccountToken (param: CAccount) {
    return jwt.sign(param, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', {expiresIn: '12h'} );
}
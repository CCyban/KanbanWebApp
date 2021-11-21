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


            // Existing username/password match check
            const doesAccountAlreadyExist = await collections.accounts.findOne(Account);
            if (doesAccountAlreadyExist) {
                // Send account token since the request matched the account details
                res.status(200).send({ accountToken: generateAccessToken(Account) })
            }
            else {
                // Existing username check before account creation
                const isUsernameAlreadyUsed = await collections.accounts.findOne({ Username: Account.Username }); 
                if (isUsernameAlreadyUsed) {
                    res.status(400).send("Username already used");
                }
                else {
                    // Create account with the given request details
                    const Result = await collections.accounts.insertOne(accountDocument);

                    // Send account token since the request made the account
                    Result
                        ? res.status(201).send({ accountToken: generateAccessToken(Account) })
                        : res.status(500).send("Failed to create a new account & generate token.");
                }
            }
        } catch (Error: any) {
            console.error(Error);
            res.status(400).send(Error.message);
        }
    }
});

function generateAccessToken(param: Object){
    return jwt.sign(param, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp');
}
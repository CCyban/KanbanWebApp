// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { accountSchema } from "../models/MAccount";
import { model } from "mongoose";
import { CAccount } from "../classes/CAccount";
import jwt from 'jsonwebtoken';

// Global Config
export const accountsRouter = express.Router();
accountsRouter.use(express.json());

// POST new account
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

// PUT request to alter password
accountsRouter.put("/", async (req: Request, res: Response) => {
    const token: string = req.headers["authorization"] ?? "";

    jwt.verify(token, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', async (err, decode) => {
        if (err) {
            // Invalid token, do not proceed with request
            // 401 = Unauthorized
            return res.status(401).send({ message: "Invalid token" });
        }
        else {
            // Valid token, should proceed with request
            if (collections.accounts != undefined) {
                try {
                    const accountFromToken = decode as CAccount;
                    const newPassword = (req.body.newPassword as string);
                    const updatedAccount = new CAccount(accountFromToken.Username, newPassword);

                    const existingAccount = await collections.accounts.findOne({ Username: accountFromToken.Username }); 
                    const query = { _id: existingAccount?._id };

                    // 200 = OK
                    // 304 = Not Modified
                    const result = await collections.accounts.updateOne(query, { $set: updatedAccount });
                    result
                        ? res.status(200).send("Successfully updated account with id " + existingAccount?._id)
                        : res.status(304).send("Account with id: " + existingAccount?._id +  " not updated");
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

// DELETE your own account
accountsRouter.delete("/", async (req: Request, res: Response) => {
    const token: string = req.headers["authorization"] ?? "";

    jwt.verify(token, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', async (err, decode) => {
        if (err) {
            // Invalid token, do not proceed with request
            // 401 = Unauthorized
            return res.status(401).send({ message: "Invalid token" });
        }
        else {
            // Valid token, should proceed with request
            if (collections.accounts != undefined) {
                try {
                    const accountFromToken = decode as CAccount;
                    const existingAccount = await collections.accounts.findOne({ Username: accountFromToken.Username }); 
                    const query = { _id: existingAccount?._id };
                    const result = await collections.accounts.deleteOne(query);

                    if (result && result.deletedCount) {
                        // 200 = OK
                        res.status(200).send("Successfully removed account with id " + existingAccount?._id);
                    } else if (!result) {
                        // 400 = Bad Request
                        res.status(400).send("Failed to remove account with id " + existingAccount?._id);
                    } else if (!result.deletedCount) {
                        // 404 = Not Found
                        res.status(404).send("Account with id " + existingAccount?._id + " does not exist");
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

// Generates an 12-hour token used for authentication and authorization 
function generateAccountToken (param: CAccount) {
    return jwt.sign(param, 'jmNJL$rhQQjFV5%!pC8e5xQGo9gKtp', {expiresIn: '12h'} );
}
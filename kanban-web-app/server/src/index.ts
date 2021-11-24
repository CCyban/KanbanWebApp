import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectToDatabase from "./services/database.service";
import { kanbansRouter } from "./routes/kanbans.router";
import { Console } from 'console';
import { accountsRouter } from './routes/accounts.router';
import { Server } from 'http';

export let server: Server;

const app = express();
const port = 8090;

app.use(cors());

connectToDatabase()
    .then(() => {
        app.use("/kanbans", kanbansRouter);
        app.use("/accounts", accountsRouter);


        server = app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

// Basic route
app.get("/", (req, res) => {
    res.json({ message: "The server is running." });
});

export default app;
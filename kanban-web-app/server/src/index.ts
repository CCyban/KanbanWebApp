import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectToDatabase from "./services/database.service";
import { kanbansRouter } from "./routes/kanbans.router";
import { Console } from 'console';

const app = express();
const port = 8090;

connectToDatabase()
    .then(() => {
        app.use("/kanbans", kanbansRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });


// Been following this https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
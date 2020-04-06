import "reflect-metadata";
import * as express from 'express';
import apiRouter from './routes';
import appConstants from './constants/AppConstants';
import { createConnection } from "typeorm";
import * as cors from "cors";
import { AuthService } from "./services/AuthService";

async function initialize() {
    const app = express();

    await createConnection();
    app.use(cors());

    app.use(express.json());

    app.use("/api/", apiRouter);
    app.use('/apidoc', express.static('apidoc'));

    app.listen(appConstants.port, () => {
        console.log(process.pid);
        console.log(`App listening on the http://localhost:${appConstants.port}`);
    });
}

initialize();
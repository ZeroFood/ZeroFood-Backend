import "reflect-metadata";
import * as express from 'express';
import apiRouter from './routes';
import appConstants from './constants/AppConstants';
import { createConnection } from "typeorm";
import * as cors from "cors";
var basicAuth = require('basic-auth');

async function initialize() {
    const app = express();

    // await createConnection();
    app.use(cors());

    app.use(express.json());

    var auth = function (req, res, next) {
        var user = basicAuth(req);
        console.log(user);
        if (user && user.name === 'admin' && user.pass === 'zerofood1') {
            next();
        } else {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
        }
    }

    app.use("/api/", apiRouter);
    app.use('/apidoc', auth, express.static('apidoc'));

    app.listen(appConstants.port, () => {
        console.log(process.pid);
        console.log(`App listening on the http://localhost:${appConstants.port}`);
    });
}

initialize();
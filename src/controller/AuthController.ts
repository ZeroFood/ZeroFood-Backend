import { Response, Request } from "express";
import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "./../entity/User";
import { UserService } from "./../services/UserService";
import { AuthService } from "../services/AuthService";

export class AuthController {
    constructor() {

    }

    async login(req: Request, res: Response) {
        try {
            let authService = new AuthService();
            res.send(await authService.authenticate(req.body.emailId, req.body.password));
        } catch (e) {
            res.statusCode = 401;
            res.send(e.message);
        }
    }

    // async test(req: Request, res: Response) {
    //     let authService = new AuthService();
    //     res.send(await authService.authenticate(req.body.emailId, req.body.password));
    // }
}
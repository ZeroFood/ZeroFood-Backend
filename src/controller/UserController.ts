import { Response, Request } from "express";
import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "./../entity/User";
import { UserService } from "./../services/UserService";

export class UserController {
    constructor() {

    }

    async getUsers(req: Request, res: Response) {
        return res.send(await getRepository(User).find());
    }

    async createUser(req: Request, res: Response) {
        try {
            let userService = new UserService();
            console.log(req.body);
            const user = new User(req.body);
            console.log(user);
            res.send(await userService.saveUser(user));
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }

}
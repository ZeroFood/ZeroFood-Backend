import { Response, Request } from "express";
import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "./../entity/User";
import { UserService } from "./../services/UserService";
import { ErrorResponse } from "../entity/ErrorResponse";

export class UserController {
    constructor() {

    }

    async getUsers(req: Request, res: Response) {
        return res.send(await getRepository(User).find());
    }

    async createUser(req: Request, res: Response) {
        try {
            let userService = new UserService();
            let userObj = Object.assign({}, req.body);
            delete userObj.password;
            const user = new User(userObj);
            const existingUser = await userService.getUserByEmailId(user.emailId);
            if (existingUser) {
                res.statusCode = 409;
                res.send(new ErrorResponse(409, "User with this Email Id is already registered"));
            } else {
                user.encryptPassword(req.body.password);
                res.send(await userService.saveUser(user));
            }
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.send(new ErrorResponse(500, e.message));
        }
    }

}
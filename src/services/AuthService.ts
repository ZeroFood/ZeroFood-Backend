import { Repository, getRepository } from "typeorm";
import { User } from "../entity/User";
import { UserService } from "./UserService";
const md5 = require('md5');
const jwt = require("jsonwebtoken");

export class AuthToken {
    token: string;
    expiry?: number = 3600;
    user: User;
}

export class AuthService {

    constructor() {
    }

    async authenticate(emailId: string, password: string): Promise<AuthToken> {
        let userService = new UserService();
        let user: User = await userService.getUserByEmailId(emailId);
        console.log("User: ", user);
        console.log("password: " + password);
        if (user.encryptedPassword === md5(password)) {
            console.log("Password validated");
            return this.generateToken(user);
        } else {
            throw new Error("Invalid Email Id or Password");
        }
    }

    generateToken(user: User): AuthToken {
        var token = jwt.sign(Object.assign({}, user), 'shhhhh', { expiresIn: '22h' });

        return {
            token: token,
            expiry: 3600 * 22,
            user: user
        };
    }

    validateToken(token: string): User {
        return jwt.verify(token, 'shhhhh');
    }

}
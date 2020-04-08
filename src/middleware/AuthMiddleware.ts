import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { ErrorResponse } from "../entity/ErrorResponse";

export class AuthMiddleware {
    constructor() {

    }

    static async validate(req: Request, res: Response, next: NextFunction) {
        let authService = new AuthService();
        try {
            let user = await authService.validateToken(AuthMiddleware.fromHeaderOrQuerystring(req));
            console.log("request from user: ", user.id);
            req['user'] = user;
            next();
        } catch (e) {
            res.statusCode = 401;
            res.send(new ErrorResponse(401, e.message));
        }
    }

    static fromHeaderOrQuerystring(req: Request): any {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}

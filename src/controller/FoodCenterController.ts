import { Response, Request } from "express";
import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { UserService } from "../services/UserService";
import { FoodCenter } from "../entity/FoodCenter";
import { FoodCenterService } from "../services/FoodCenterService";

export class FoodCenterController {
    constructor() {

    }

    async getFoodCenters(req: Request, res: Response) {
        let foodCenterService = new FoodCenterService();
        return res.send(await foodCenterService.getAll());
    }

    async addFoodCenter(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            const foodCenter = new FoodCenter(req.body);
            res.send(await foodCenterService.saveFoodCenter(foodCenter));
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }

}
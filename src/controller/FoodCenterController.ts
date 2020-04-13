import { Response, Request } from "express";
import { FoodCenter } from "../entity/FoodCenter";
import { FoodCenterService } from "../services/FoodCenterService";
import { ErrorResponse } from "../entity/ErrorResponse";

export class FoodCenterController {
    constructor() {

    }

    async getFoodCenters(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            res.send(await foodCenterService.getAll(req.query));
        } catch (e) {
            res.statusCode = 500;
            res.send(new ErrorResponse(500, e.message));
        }
    }

    async getFoodCenterById(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            res.send(await foodCenterService.getFoodCenterById(req.params.id));
        } catch (e) {
            res.statusCode = 500;
            res.send(new ErrorResponse(500, e.message));
        }
    }

    async getFoodCentersByUserId(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            res.send(await foodCenterService.getByUserId(req.params.id));
        } catch (e) {
            res.statusCode = 500;
            res.send(new ErrorResponse(500, e.message));
        }
    }

    async addFoodCenter(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            const foodCenter = new FoodCenter(req.body);
            res.send(await foodCenterService.saveFoodCenter(foodCenter));
        } catch (e) {
            res.statusCode = 500;
            res.send(new ErrorResponse(500, e.message));
        }
    }

    async updateFoodCenter(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            const foodCenter = new FoodCenter(req.body);
            await foodCenterService.updateFoodCenter(req.params.id, foodCenter)
            res.send(await foodCenterService.getFoodCenterById(req.params.id));
        } catch (e) {
            res.statusCode = 500;
            res.send(new ErrorResponse(500, e.message));
        }
    }


    async getFoodCenterCount(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            let count = await foodCenterService.getFoodCenterCount(req.query);
            res.send({ count: count });
        } catch (e) {
            res.statusCode = 500;
            res.send(new ErrorResponse(500, e.message));
        }
    }

}
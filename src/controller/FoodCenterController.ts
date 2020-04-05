import { Response, Request } from "express";
import { FoodCenter } from "../entity/FoodCenter";
import { FoodCenterService } from "../services/FoodCenterService";

export class FoodCenterController {
    constructor() {

    }

    async getFoodCenters(req: Request, res: Response) {
        let foodCenterService = new FoodCenterService();
        return res.send(await foodCenterService.getAll(req.query));
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

    async updateFoodCenter(req: Request, res: Response) {
        try {
            let foodCenterService = new FoodCenterService();
            const foodCenter = new FoodCenter(req.body);
            await foodCenterService.updateFoodCenter(req.params.id, foodCenter)
            res.send(await foodCenterService.getFoodCenterById(req.params.id));
        } catch (e) {
            res.send("Error: " + e.message);
        }
    }


    // async search(req: Request, res: Response) {
    //     let foodCenterService = new FoodCenterService();
    //     return res.send(await foodCenterService.getAll());
    // }


}
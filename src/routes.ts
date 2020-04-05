import * as express from "express";
import { UserController } from './controller/UserController';
import { FoodCenterController } from "./controller/FoodCenterController";

const router = express.Router();

let userController = new UserController();
// User Endpoints
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);


// Food Centers
let foodCenterController = new FoodCenterController();
router.get("/food-centers", foodCenterController.getFoodCenters);
router.post("/food-centers", foodCenterController.addFoodCenter);

export default router;
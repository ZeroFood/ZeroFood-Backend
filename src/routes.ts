import * as express from "express";
import { UserController } from './controller/UserController';
import { FoodCenterController } from "./controller/FoodCenterController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddleware } from './middleware/AuthMiddleware';
const router = express.Router();

let userController = new UserController();
// User Endpoints
router.get("/users", AuthMiddleware.validate, userController.getUsers);
router.post("/users", AuthMiddleware.validate, userController.createUser);

// Authentication
let authController = new AuthController();
router.post("/login", authController.login);

// Food Centers
let foodCenterController = new FoodCenterController();
router.get("/food-centers", AuthMiddleware.validate, foodCenterController.getFoodCenters);
router.post("/food-centers", AuthMiddleware.validate, foodCenterController.addFoodCenter);
router.put("/food-centers/:id", AuthMiddleware.validate, foodCenterController.updateFoodCenter);

export default router;
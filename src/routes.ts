import * as express from "express";
import { UserController } from './controller/UserController';

const router = express.Router();

let userController = new UserController();
// User Endpoints
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);


// Food Centers
// router.get("/food-centers");
// router.post("/food-centers");

export default router;
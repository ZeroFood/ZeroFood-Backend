import { Repository, getRepository } from "typeorm";
import { FoodCenter } from "../entity/FoodCenter";

export class FoodCenterService {
    foodCenterRepository: Repository<FoodCenter>;

    constructor() {
        this.foodCenterRepository = getRepository(FoodCenter);
    }

    getAll(): Promise<FoodCenter[]> {
        return this.foodCenterRepository.find({});
    }

    // getUserById(id: number): Promise<User> {
    //     return this.userRepository.findOne({
    //         where: {
    //             id: id
    //         }
    //     });
    // }

    // getUserByEmailId(emailId: string): Promise<User> {
    //     return this.userRepository.findOne({
    //         where: {
    //             emailId: emailId
    //         }
    //     });
    // }

    saveFoodCenter(foodCenter: FoodCenter): Promise<FoodCenter> {
        return this.foodCenterRepository.save(foodCenter);
    }

}
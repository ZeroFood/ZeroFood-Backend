import { Repository, getRepository } from "typeorm";
import { User } from "./../entity/User";

export class UserService {
    userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    getUserById(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    saveUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

}
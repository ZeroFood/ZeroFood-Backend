import { Repository, getRepository, UpdateResult, getMongoRepository, MongoRepository, ObjectID } from "typeorm";
import { FoodCenter } from "../entity/FoodCenter";
import { FCStatus } from "../entity/FCStatus";
import { User } from "../entity/User";
const ObjectId = require('mongodb').ObjectId;
export class FoodCenterSearch {
    q?: string;
    lat?: string;
    long?: string;
    radius?: string;
    status?: FCStatus;
}

export class FoodCenterService {
    foodCenterRepository: MongoRepository<FoodCenter>;

    constructor() {
        this.foodCenterRepository = getMongoRepository(FoodCenter);
    }

    async getAll(search: FoodCenterSearch): Promise<FoodCenter[]> {
        if (search.lat && search.long) {
            let queryAggregationOptions = this.formQueryAggregationOptions(search);
            return this.foodCenterRepository.aggregate(queryAggregationOptions).toArray();
        } else {
            let queryOptions = this.formQueryOptions(search);
            return this.foodCenterRepository.find(queryOptions);
        }
    }

    getByUserId(id: string): Promise<FoodCenter[]> {
        const user = new User({ id: id });
        return this.foodCenterRepository.find({ "user": user });
    }


    formQueryAggregationOptions(search: FoodCenterSearch): any {
        let radiusInMeters = Number(search.radius ? search.radius : 5) * 1000;
        let queryFilter: any = {
            status: {
                $in: [FCStatus.LISTED]
            }
        };
        if (search.status) {
            let statusArr = search.status.split(",");
            queryFilter.status["$in"] = statusArr;
        }

        let query: any = [{
            '$geoNear': {
                near: { type: "Point", coordinates: [parseFloat(search.long), parseFloat(search.lat)] },
                distanceField: "dist.calculated",
                maxDistance: radiusInMeters,
                query: queryFilter,
                includeLocs: "dist.location",
                spherical: true
            }
        }];
        console.log(JSON.stringify(query));
        return query;
    }

    formQueryOptions(search: FoodCenterSearch): any {
        let query: any = {
            status: {
                $in: [FCStatus.LISTED]
            }
        };

        if (search.lat && search.long) {
            let radius: number = parseInt(search.radius ? search.radius : "5");
            query['location'] = {
                $geoWithin: {
                    $centerSphere: [[parseFloat(search.long), parseFloat(search.lat)], radius / 3963.2]
                }
            };
        } else {
            if (search.q) {
                let split = search.q.trim().split(",");
                if (split.length === 4) {
                    query['$or'] = [
                        { state: { $regex: ".*" + split[2].trim() + ".*", $options: "i" } },
                        { city: { $regex: ".*" + split[1].trim() + ".*", $options: "i" } },
                        { address: { $regex: ".*" + split[0].trim() + ".*", $options: "i" } }
                    ];
                } else if (split.length === 3) {
                    query['$or'] = [
                        { state: { $regex: ".*" + split[1].trim() + ".*", $options: "i" } },
                        { city: { $regex: ".*" + split[0].trim() + ".*", $options: "i" } },
                        { address: { $regex: ".*" + split[0].trim() + ".*", $options: "i" } }
                    ];
                } else if (split.length === 2) {
                    query['$or'] = [
                        { state: { $regex: ".*" + split[1].trim() + ".*", $options: "i" } },
                        { city: { $regex: ".*" + split[1].trim() + ".*", $options: "i" } },
                        { address: { $regex: ".*" + split[0].trim() + ".*", $options: "i" } }
                    ];
                } else {
                    query['$or'] = [
                        { state: { $regex: ".*" + split[0] + ".*", $options: "i" } },
                        { city: { $regex: ".*" + split[0] + ".*", $options: "i" } },
                        { address: { $regex: ".*" + split[0] + ".*", $options: "i" } }
                    ];
                }
            }
        }

        if (search.status) {
            let statusArr = search.status.split(",");
            query.status["$in"] = statusArr;
        }

        console.log(JSON.stringify(query));
        return query;
    }

    getFoodCenterById(id: string): Promise<FoodCenter> {
        return this.foodCenterRepository.findOneOrFail({
            where: {
                _id: new ObjectId(id)
            }
        });
    }

    saveFoodCenter(foodCenter: FoodCenter): Promise<FoodCenter> {
        if (foodCenter.location && foodCenter.location.coordinates) {
            let coord = foodCenter.location.coordinates;
            if (coord.length == 2) {
                foodCenter.long = coord[0];
                foodCenter.lat = coord[1];
            }
        }
        return this.foodCenterRepository.save(foodCenter);
    }

    updateFoodCenter(id: string, foodCenter: FoodCenter): Promise<UpdateResult> {
        return this.foodCenterRepository.update(id, foodCenter);
    }

    getFoodCenterCount(search: FoodCenterSearch): Promise<number> {
        let queryOptions = this.formQueryOptions(search);
        return this.foodCenterRepository.count(queryOptions);
    }

}
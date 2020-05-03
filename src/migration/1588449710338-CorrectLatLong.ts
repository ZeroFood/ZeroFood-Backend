import { MigrationInterface, UpdateResult } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { User } from "../entity/User";
import { FoodCenter } from "../entity/FoodCenter";

export class CorrectLatLong1588449710338 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<any> {
        let maxLat = 37.10000000;
        let minLat = 8.06666667;
        let incorrectFC = await queryRunner.manager.find<FoodCenter>(FoodCenter, {
            where: {
                $or: [{
                    lat: { $gte: maxLat }
                }, {
                    lat: { $lte: minLat }
                }]
            }
        });
        console.log("Before update, incorrect Lat Long FC count", incorrectFC.length);
        for (const fc of incorrectFC) {
            let uc: any = {};
            let temp = fc.lat;
            uc.lat = fc.long;
            uc.long = temp;
            uc.location = { type: "Point" };
            uc.location.coordinates = [uc.long, uc.lat];
            await queryRunner.manager.update(FoodCenter, { id: fc.id }, uc);
        }

        incorrectFC = await queryRunner.manager.find<FoodCenter>(FoodCenter, {
            where: {
                $or: [{
                    lat: { $gte: maxLat }
                }, {
                    lat: { $lte: minLat }
                }]
            }
        });

        console.log("After update, incorrect Lat Long FC count", incorrectFC.length);
        return this.updateMisMatchLatLong(queryRunner);
    }

    private async updateMisMatchLatLong(queryRunner: MongoQueryRunner) {
        let allFC = await queryRunner.manager.find<FoodCenter>(FoodCenter, {});
        let misMatchFC = allFC.filter(fc => {
            return fc.long != fc.location.coordinates[0];
        });
        console.log("Before update, mismatch Lat Long FC count", misMatchFC.length);
        for (const fc of misMatchFC) {
            let uc: any = {};
            uc.location = { type: "Point" };
            uc.location.coordinates = [fc.long, fc.lat];
            await queryRunner.manager.update(FoodCenter, { id: fc.id }, uc);
        }

        allFC = await queryRunner.manager.find<FoodCenter>(FoodCenter, {});
        misMatchFC = allFC.filter(fc => {
            return fc.long != fc.location.coordinates[0];
        });
        console.log("After update, mismatch Lat Long FC count", misMatchFC.length);
        return true;
    }

    public async down(queryRunner: MongoQueryRunner): Promise<any> {
    }

}

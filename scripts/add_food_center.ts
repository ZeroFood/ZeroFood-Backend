import { FoodCenter } from "../src/entity/FoodCenter";
import { FoodCenterService } from "../src/services/FoodCenterService";
import { createConnection } from "typeorm";

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

(async () => {
  async function readCsvFile() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(__dirname + '/../data/List_of_Entires_for_Free_Food.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        });
    });
  }

  function toPojo(jsonArr: any) {
    let pojoArr: FoodCenter[] = [];
    jsonArr.forEach(json => {
      let startlTime = json["Lunch-Time - IN"] ? json["Lunch-Time - IN"].trim() : null;
      let endlTime = json["Lunch-Time - Out"] ? json["Lunch-Time - Out"].trim() : null;
      let startdTime = json["Dinner Time - IN"] ? json["Dinner Time - IN"].trim() : null;
      let enddTime = json["Dinner Time - Out"] ? json["Dinner Time - Out"].trim() : null;
      let foodCenter = new FoodCenter({
        "name": json["Place_Name"].trim(),
        "state": json["State"].trim(),
        "city": json["City"].trim(),
        "address": json["Address"].trim(),
        "timings": {
          lunch: {
            start: startlTime,
            end: endlTime
          },
          dinner: {
            start: startdTime,
            end: enddTime
          }
        },
        "capacity": Number(json['Capacity'].trim()),
        "contactNumber": json['Contact'].trim(),
        "location": {
          "type": "Point",
          "coordinates": [parseFloat(json['Long'].trim()), parseFloat(json['Lat'].trim())]
        },
        "user": {
          "id": "5e8b6697af82be3aba8d531f"
        }
      });
      pojoArr.push(foodCenter);
    });
    console.log(pojoArr);
    console.log(typeof pojoArr);
    return pojoArr;
  }

  async function save(pojoArr) {
    try {
      let count = 0;
      for (const foodCenter of pojoArr) {
        let foodCenterService = new FoodCenterService();
        let savedFoodCenter = await foodCenterService.saveFoodCenter(foodCenter);
        count++;
        console.log(count, savedFoodCenter.id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  await createConnection();
  let jsonData = await readCsvFile();
  await save(toPojo(jsonData));
  console.log("completed adding files");

})();

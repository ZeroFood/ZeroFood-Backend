import { Entity, Column, CreateDateColumn, ObjectIdColumn, ObjectID, Double } from "typeorm";
import { FCStatus } from "./FCStatus";
import { User } from "./User";
import { Location } from "./Location";

export class Time {
    start: string;
    end: string;
}

export class Timings {
    lunch?: Time;
    dinner?: Time;
}

export class Distance {
    calculated: Double;
    location: Location;
}

@Entity()
export class FoodCenter {

    constructor(json: Object) {
        Object.assign(this, json);
    }

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    capacity: number;

    @Column({ type: "double" })
    lat: Double;

    @Column({ type: "double" })
    long: Double;

    @Column("simple-json")
    location: Location;

    @Column()
    timings: Timings;

    @Column()
    contactNumber: string;

    @Column({ nullable: false })
    user: User;

    @Column()
    status: FCStatus = FCStatus.UNLISTED;

    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    updatedDate: Date;

    @Column("simple-json")
    dist: Distance;

}
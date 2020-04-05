import { Entity, Column, CreateDateColumn, ObjectIdColumn, ObjectID, Double } from "typeorm";
import { FCStatus } from "./FCStatus";
import { User } from "./User";
import { Location } from "./Location";

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
    capcity: number;

    @Column({ type: "double" })
    lat: Double;

    @Column({ type: "double" })
    long: Double;

    @Column("simple-json")
    location: Location;

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


}
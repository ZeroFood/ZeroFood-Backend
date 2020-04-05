import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, ObjectIdColumn, ObjectID } from "typeorm";
import Role from "./Role";
const md5 = require('md5');

@Entity()
export class User {

    constructor(json: Object) {
        Object.assign(this, json);
    }

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    fullName: string;

    @Column()
    emailId: string;

    password: string;

    @Column()
    encryptedPassword: string;

    @Column()
    phoneNumber: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    updatedDate: Date;

    @BeforeInsert()
    encryptPassword() {
        this.encryptedPassword = md5(this.password);
    }

}
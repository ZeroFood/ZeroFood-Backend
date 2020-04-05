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

    @Column()
    encryptedPassword: string;

    @Column()
    phoneNumber: string;

    @Column()
    role: Role = Role.USER;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    encryptPassword(password: String) {
        this.encryptedPassword = md5(password);
    }
}
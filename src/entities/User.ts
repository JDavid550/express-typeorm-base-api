import { IsEmail } from "class-validator";
import {
  Column, PrimaryGeneratedColumn, Entity, OneToMany, CreateDateColumn, UpdateDateColumn,
} from "typeorm";
import Photo from "./Photo";

export enum RoleEnum{
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
  DESIGNER = "DESIGNER",
  PM = "PROJECT MANAGER",
  SM = "SCRUM MASTER",
  HR = "HR",
  CONTRACTOR = "CONTRACTOR",
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?:string;
    
  @UpdateDateColumn()
    updatedAt?:string;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column({ type: "varchar", unique:true })
  @IsEmail()
    email: string;

  @Column()
    password: string;

  @Column({ nullable:true })
    avatarImg!: string;

  @Column({ nullable:true, default: RoleEnum.DEVELOPER })
    role!: RoleEnum;

  @OneToMany(() => Photo, photo => photo.user, { eager:true })
    photos?: Photo[];

}
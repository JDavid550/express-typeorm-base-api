import {
  Column, PrimaryGeneratedColumn, Entity, OneToMany, 
} from "typeorm";
import { MinLength, Matches } from "class-validator";
import Photo from "./Photo";

enum RoleEnum{
  admin,
  developer,
  designer,
  project,
  manager,
  scrumMaster,
  HR,
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  // @Column()
  //   name: string;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column()
    email: string;

  @Column()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message:"Your password is too weak" })
    password: string;

  @Column({ nullable:true })
    avatarImg!: string;

  @Column({ nullable:true, default: RoleEnum.developer })
    role!: RoleEnum;

  @OneToMany(() => Photo, photo => photo.user, { eager:true })
    photos: Photo[];

}
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    avatarImg: string;
}
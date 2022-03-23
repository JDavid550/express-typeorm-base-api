import { 
  Column, PrimaryGeneratedColumn, Entity, ManyToOne, 
} from "typeorm";
import User from "./User";

@Entity()
export default class Photo {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    filename: string;

  @Column({ default: false })
    isPublic: boolean;

  @ManyToOne(() => User, user => user.photos)
    user: User;
}

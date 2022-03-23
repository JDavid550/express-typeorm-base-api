import { 
  IsEmail, IsNotEmpty, IsString, MinLength, Matches, 
} from "class-validator";
import { Transform } from "class-transformer";

export default class UserCreateValidator {
  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public lastName: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message:"Your password is too weak" })
    password: string;


  @IsEmail()
  public email: string;
}

import { 
  IsEmail, IsNotEmpty, IsString, MinLength, Matches, 
} from "class-validator";
import { Transform } from "class-transformer";
import regexExpressions from "../../utils/RegexExpressions";

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
  @Matches(regexExpressions.password.regex, { message: regexExpressions.password.msg })
    password: string;


  @IsEmail()
  public email: string;
}

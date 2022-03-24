import {
  IsString, MinLength, IsEmail, IsNotEmpty, Matches, IsEnum, 
} from "class-validator";
import { Transform } from "class-transformer";
import regexExpressions from "../../utils/RegexExpressions";
import { RoleEnum  } from "../../entities/User";

export default class UserValidator {
  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public lastName: string;

  @IsEmail()
  public email: string;

  @MinLength(8)
  @Matches(regexExpressions.password.regex, { message: regexExpressions.password.msg })
    password?: string;

  @IsString()
  public avatarImg?: string;

  @IsEnum(RoleEnum)
  public role:RoleEnum;
}

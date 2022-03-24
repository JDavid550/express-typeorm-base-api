import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 * Validate get number id param
 */
export default class IdParamValidator {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  declare public id: number;
}

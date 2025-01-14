import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";

/**
 * Validate interface of req.body
 * @param type - expected interface
 * @param skipMissingProperties - should ignore missing properties from interface
 */
const ParamsValidator = (
  type: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  skipMissingProperties = true,
): IRequestHandler => (
  req,
  res,
  next,
) => validate(plainToInstance(type, req.params), { skipMissingProperties })
  .then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
      next(new HttpException(400, message));
    } else {
      next();
    }
  });
export default ParamsValidator;

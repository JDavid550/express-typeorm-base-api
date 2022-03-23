import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import UserCreateValidator from "../validators/User/UserCreateValidator";
import BodyValidator from "../middlewares/BodyValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import UserGetParamsValidator from "../validators/User/UserGetParamsValidator";

/**
 * Router for Users
 */
class UserRouter implements IRouter {
  public path = "/users";

  public router: Router;

  private userController = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, ParamsValidator(UserGetParamsValidator), this.userController.getById);
    this.router.post(this.path, BodyValidator(UserCreateValidator, true), this.userController.create);
    this.router.delete(`${this.path}/:id(\\d+)`, this.userController.deleteById);
  }
}

export default UserRouter;

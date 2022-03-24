import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import UserCreateValidator from "../validators/User/UserCreateValidator";
import BodyValidator from "../middlewares/BodyValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import IdParamValidator from "../validators/IdParamValidator";
import UserUpdateValidator from "../validators/User/UserUpdateValidator";

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
    this.router.get(`${this.path}/:id(\\d+)`, ParamsValidator(IdParamValidator), this.userController.getById);
    this.router.post(this.path, BodyValidator(UserCreateValidator, true), this.userController.create);
    this.router.patch(`${this.path}/:id(\\d+)`, ParamsValidator(IdParamValidator), BodyValidator(UserUpdateValidator, true), this.userController.update); 
    this.router.delete(`${this.path}/:id(\\d+)`, ParamsValidator(IdParamValidator), this.userController.deleteById);
  }
}

export default UserRouter;

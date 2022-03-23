import { Router } from "express";
import PhotoController from "../controllers/PhotoController";
import IRouter from "../types/IRouter";
<<<<<<< Updated upstream
import PhotoCreateBodyValidator from "../validators/Photo/PhotoCreateBodyValidator";
import BodyValidator from "../middlewares/BodyValidator";
import PhotoUpdateBodyValidator from "../validators/Photo/PhotoUpdateBodyValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import PhotoUpdateParamsValidator from "../validators/Photo/PhotoUpdateParamsValidator";
import PhotoGetParamsValidator from "../validators/Photo/PhotoGetParamsValidator";
=======
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";
import myValidator from "../middlewares/Validator";
import PhotoUpdateValidator from "../validators/Photo/PhotoUpdateValidator";
>>>>>>> Stashed changes

/**
 * Router for Photos
 */
class PhotoRouter implements IRouter {
  public path = "/photos";

  public router: Router;

  private photoController = new PhotoController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
<<<<<<< Updated upstream
    this.router.get(`${this.path}/:id(\\d+)`, ParamsValidator(PhotoGetParamsValidator), this.photoController.getById);
    this.router.patch(`${this.path}/:id(\\d+)`, ParamsValidator(PhotoUpdateParamsValidator, false), BodyValidator(PhotoUpdateBodyValidator), this.photoController.updateById);
    this.router.delete(`${this.path}/:id(\\d+)`, ParamsValidator(PhotoUpdateParamsValidator, false), BodyValidator(PhotoUpdateBodyValidator), this.photoController.deleteById);
    this.router.post(this.path, BodyValidator(PhotoCreateBodyValidator, true), this.photoController.create);
=======
    this.router.get(`${this.path}/:id(\\d+)`, this.photoController.getById);
    this.router.post(this.path, myValidator(PhotoCreateValidator, true), this.photoController.create);
    this.router.patch(`${this.path}/:id(\\d+)`, myValidator(PhotoUpdateValidator, true), this.photoController.update);
    this.router.delete(`${this.path}/:id(\\d+)`,  this.photoController.delete);
>>>>>>> Stashed changes
  }
}

export default PhotoRouter;

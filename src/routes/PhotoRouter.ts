import { Router } from "express";
import PhotoController from "../controllers/PhotoController";
import IRouter from "../types/IRouter";
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";
import myValidator from "../middlewares/Validator";

class PhotoRouter implements IRouter {
  public path = "/photos";

  public router: Router;

  private photoController = new PhotoController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.photoController.getById);
    this.router.post(this.path, myValidator(PhotoCreateValidator, true), this.photoController.create);
    this.router.patch(`${this.path}/:id(\\d+)`, myValidator(PhotoCreateValidator, true), this.photoController.update);
    this.router.delete(`${this.path}/:id(\\d+)`,  this.photoController.delete);
  }
}

export default PhotoRouter;

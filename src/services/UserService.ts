/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import UserRepository from "../repositories/UserRepository";
import User from "../entities/User";
import UserCreateValidator from "../validators/User/UserCreateValidator";
import NotFoundException from "../exceptions/NotFoundException";

/**
 * Handle business logic for Photo using Data Mapper & Repository pattern.
 */
export default class UserService implements IService<User>{
  /**
   * Get available repository with established connection to a data storage
   * @private
   */
  private static getRepository(): ReturnType<typeof UserRepository> {
    return UserRepository();
  }

  /**
   * Error message for NotFoundException
   * @param id
   */
  private static notFoundErrorMessage = (id: number) => `User id:${id} not found`;

  /**
   * Gets user by id
   * Success: existing photo
   * @param id
   */

  public async getById(id: number): Promise<User> {
    const user = await UserService.getRepository().findById(id);
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage(id));
    return user;
  }

  /**
   * Creates User
   * Success: new photo
   * @param userData
   */
  public async create(userData: UserCreateValidator): Promise<User> {
    return UserService.getRepository().save({ ...userData });
  }

  /**
   * Deletes photo by id
   * Success: void
   * @param id
   */
  public async deleteById(id: number): Promise<void> {
    const deleteData = await UserService.getRepository().delete({ id });
    if (deleteData.affected === 0) {
      throw new NotFoundException(UserService.notFoundErrorMessage(id));
    }
  }
}

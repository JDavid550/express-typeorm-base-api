/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import UserRepository from "../repositories/UserRepository";
import User from "../entities/User";
import UserCreateValidator from "../validators/User/UserCreateValidator";
import NotFoundException from "../exceptions/NotFoundException";
import UserUpdateValidator from "../validators/User/UserUpdateValidator";

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
   * Success: existing user
   * @param id
   */

  public async getById(id: number): Promise<User> {
    const user = await UserService.getRepository().findById(id);
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage(id));
    return user;
  }

  /**
   * Creates User
   * Success: new user
   * @param userData
   */
  public async create(userData: UserCreateValidator): Promise<User> {
    return UserService.getRepository().save({ ...userData });
  }

  /** 
   * Updates User
   * Success: updates user
   * @param id
   * @param payload
  */
  public async updateById(id:number, payload: UserUpdateValidator): Promise<User>{
    const user = await this.getById(id);
    const repo = UserService.getRepository();
    const updatedUser = repo.merge(user, payload);
    const result =  repo.save(updatedUser); 
    return result;

  }

  /**
   * Deletes user by id
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

/* eslint-disable class-methods-use-this */
import axios, { Method } from "axios";
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

  /**
   * Auth0
   */


  public async auth():Promise<any>{
    const method:Method = "POST";
    const options = {
      method,
      url:"https://dev-fqoy7wf5.us.auth0.com/oauth/token",
      headers:{ "content-type": "application/json" },
      data: { 
        grant_type:"client_credentials",
        client_id:"5iWgNjmZB3Q2age03vC8hmm5pmSi7Qoe", 
        client_secret:"00pYDZqs698v_Mof8jjx9iu47vpdyzDPfs-hYukCS_OeSzH6E_YF32v4jVneTknE", 
        audience:"https://dev-fqoy7wf5.us.auth0.com/api/v2/", 
      },
    };

    const data = await axios.request(options)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.error(error);
        return error;
      });

    
    return data;
  }
  
}

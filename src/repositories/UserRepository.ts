import User from "../entities/User";
import Database from "../providers/Database";

/**
 * Concrete repository for User
 */
const UserRepository = () => Database.getConnection().getRepository(User).extend({
  findById(id: number): Promise<User> {
    return this.findOne({ where: { id } });
  },
});

export default UserRepository;
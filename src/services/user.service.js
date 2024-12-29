const UserRepository = require('../reposiroties/user.repository');

class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data) {
    return await UserRepository.create(data);
  }

  async updateUser(id, data) {
    await this.getUserById(id); // Verifica que exista
    return await UserRepository.update(id, data);
  }

  async deleteUser(id) {
    await this.getUserById(id); // Verifica que exista
    return await UserRepository.delete(id);
  }
}

module.exports = new UserService();

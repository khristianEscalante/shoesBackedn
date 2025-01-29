const UserService = require('../services/user.service');

class UserController {
  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Registro de usuario
   */
  async register(req, res) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Login de usuario
   */
  async login(req, res) {
    try {
      const { user, token } = await UserService.login(req.body);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Cambio de contraseña (requiere autenticación)
   */
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword, userId } = req.body;
      const result = await UserService.changePassword(userId, currentPassword, newPassword);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Enviar correo para recuperación de contraseña
   */
  async sendPasswordResetEmail(req, res) {
    try {
      const result = await UserService.sendPasswordResetEmail(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Restablecer contraseña con token
   */
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      const result = await UserService.resetPassword(token, newPassword);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();

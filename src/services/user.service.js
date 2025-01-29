const UserRepository = require('../reposiroties/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

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

  async register(data) {
    const { name, email, phone, password } = data;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
    );

    let photo = 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png' 
    const user = await UserRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      photo
    });

    return user;
  }

  async login(data) {
    const { email, password } = data;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    console.log(process.env.JWT_EXPIRATION);
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION
      }
    );

    return { user, token };
  }

  /**
   * Lógica para cambiar la contraseña
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await this.getUserById(userId);

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
    );

    await UserRepository.update(userId, { password: hashedNewPassword });

    return { message: 'Password updated successfully' };
  }

  /**
   * Lógica para enviar un correo de recuperación de contraseña
   */
  async sendPasswordResetEmail(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email not found');
    }

    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION } // Token válido por 1 hora
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recupera tu contraseña',
      html: `
        <p>Tu puedes recuperar tu contraseña.</p>
        <p>Para recuperar tu contraseña ingresa a este link:</p>
        <a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}">Reset Password</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { message: 'Password reset email sent' };
  }

  /**
   * Lógica para restablecer la contraseña con el token
   */
  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await this.getUserById(decoded.id);

      const hashedNewPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
      );

      await UserRepository.update(user.id, { password: hashedNewPassword });

      return { message: 'Password has been reset successfully' };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = new UserService();

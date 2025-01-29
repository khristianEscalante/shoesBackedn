const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         phone:
 *           type: string
 *           description: Número de teléfono del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         photo:
 *           type: string
 *           description: URL de la foto del usuario
 *       required:
 *         - name
 *         - email
 *         - password
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         phone:
 *           type: string
 *           description: Número de teléfono del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         photo:
 *           type: string
 *           description: URL de la foto del usuario
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', UserController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', UserController.getById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', UserController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', UserController.delete);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterInput'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/users/change-password:
 *   post:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInput'
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *       400:
 *         description: Error en el cambio de contraseña
 */
router.post('/change-password', authMiddleware, UserController.changePassword);

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordInput'
 *     responses:
 *       200:
 *         description: Correo de restablecimiento enviado
 *       400:
 *         description: Error en la solicitud
 */
router.post('/forgot-password', UserController.sendPasswordResetEmail);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Restablecer la contraseña de un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *       400:
 *         description: Error en el restablecimiento de contraseña
 */
router.post('/reset-password', UserController.resetPassword);

module.exports = router;

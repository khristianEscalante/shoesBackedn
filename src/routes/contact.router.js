const express = require('express');
const ContactController = require('../controllers/contact.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: contacts
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [contacts]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/contact'
 */
router.get('/', ContactController.getAll);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [contacts]
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
 *               $ref: '#/components/schemas/contact'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', ContactController.getById);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/contactInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/contact'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', ContactController.create);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [contacts]
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
 *             $ref: '#/components/schemas/contactInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/contact'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', ContactController.update);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [contacts]
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
router.delete('/:id', ContactController.delete);

module.exports = router;

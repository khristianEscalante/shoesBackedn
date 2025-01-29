const express = require('express');
const ContactController = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: contacts
 *   description: API para gestionar contactos
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Obtener todos los contactos
 *     tags: [contacts]
 *     responses:
 *       200:
 *         description: Lista de contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   mail:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                   message:
 *                     type: string
 *                     example: "Hola, estoy interesado en sus servicios."
 */
router.get('/', authMiddleware, ContactController.getAll);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Obtener un contacto por ID
 *     tags: [contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Detalles del contacto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 mail:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 message:
 *                   type: string
 *                   example: "Hola, estoy interesado en sus servicios."
 *       404:
 *         description: Contacto no encontrado
 */
router.get('/:id', authMiddleware, ContactController.getById);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               mail:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               message:
 *                 type: string
 *                 example: "Hola, estoy interesado en sus servicios."
 *     responses:
 *       201:
 *         description: Contacto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 mail:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 message:
 *                   type: string
 *                   example: "Hola, estoy interesado en sus servicios."
 *       400:
 *         description: Datos inválidos
 */
router.post('/', ContactController.create);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Actualizar un contacto existente
 *     tags: [contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               mail:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               message:
 *                 type: string
 *                 example: "Hola, estoy interesado en sus servicios."
 *     responses:
 *       200:
 *         description: Contacto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 mail:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 message:
 *                   type: string
 *                   example: "Hola, estoy interesado en sus servicios."
 *       404:
 *         description: Contacto no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', authMiddleware, ContactController.update);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Eliminar un contacto
 *     tags: [contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       204:
 *         description: Contacto eliminado exitosamente
 *       404:
 *         description: Contacto no encontrado
 */
router.delete('/:id', authMiddleware, ContactController.delete);

module.exports = router;
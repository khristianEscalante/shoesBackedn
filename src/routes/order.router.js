const express = require('express');
const OrderController = require('../controllers/order.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: orders
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [orders]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/order'
 */
router.get('/', OrderController.getAll);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [orders]
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
 *               $ref: '#/components/schemas/order'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', OrderController.getById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/orderInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/order'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', OrderController.create);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [orders]
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
 *             $ref: '#/components/schemas/orderInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/order'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', OrderController.update);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [orders]
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
router.delete('/:id', OrderController.delete);

module.exports = router;

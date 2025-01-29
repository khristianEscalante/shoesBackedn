const express = require("express");
const OrderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: orders
 *   description: API para gestionar órdenes
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   code:
 *                     type: string
 *                     example: "shoes-1"
 *                   total:
 *                     type: number
 *                     example: 70000
 *                   status:
 *                     type: string
 *                     example: "completed"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-01T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-02T12:00:00Z"
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "zapatos nike"
 *                         image:
 *                           type: string
 *                           example: "https://ejemplo.com/image.jpg"
 *                         description:
 *                           type: string
 *                           example: "Estos zapatos son de alta calidad"
 */
router.get("/", OrderController.getAll);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Detalles de la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 code:
 *                   type: string
 *                   example: "shoes-1"
 *                 total:
 *                   type: number
 *                   example: 70000
 *                 status:
 *                   type: string
 *                   example: "completed"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-01T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-02T12:00:00Z"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "zapatos nike"
 *                       image:
 *                         type: string
 *                         example: "https://ejemplo.com/image.jpg"
 *                       description:
 *                         type: string
 *                         example: "Estos zapatos son de alta calidad"
 *       404:
 *         description: Orden no encontrada
 */
router.get("/:id", authMiddleware, OrderController.getById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 example: 80000
 *               name:
 *                 type: string
 *                 example: "Comprador ejemplo"
 *               address:
 *                 type: string
 *                 example: "Direccion ejemplo"
 *               phone:
 *                 type: string
 *                 example: "3222222222"
 *               paymentMethod:
 *                 type: string
 *                 example: "Transferencia"
 *               products:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 */
router.post("/", OrderController.create);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Actualizar una orden existente
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 example: 80000
 *               status:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 code:
 *                   type: string
 *                   example: "shoes-1"
 *                 total:
 *                   type: number
 *                   example: 80000
 *                 name:
 *                   type: string
 *                   example: "Comprador ejemplo"
 *                 address:
 *                   type: string
 *                   example: "Direccion ejemplo"
 *                 phone:
 *                   type: string
 *                   example: "3222222222"
 *                 paymentMethod:
 *                   type: string
 *                   example: "Transferencia"
 *       404:
 *         description: Orden no encontrada
 *       400:
 *         description: Datos inválidos
 */
router.put("/:id", authMiddleware, OrderController.update);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Eliminar una orden
 *     tags: [orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       204:
 *         description: Orden eliminada exitosamente
 *       404:
 *         description: Orden no encontrada
 */
router.delete("/:id", authMiddleware, OrderController.delete);

module.exports = router;

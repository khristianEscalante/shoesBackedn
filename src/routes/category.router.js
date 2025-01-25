const express = require("express");
const CategoryController = require("../controllers/category.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: categories
 *   description: API para gestionar categorías
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nombre de la categoría
 *                   description:
 *                     type: string
 *                     description: Descripción de la categoría
 *                 example:
 *                   name: "Electrónica"
 *                   description: "Productos electrónicos y gadgets"
 */
router.get("/", CategoryController.getAll);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Detalles de la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre de la categoría
 *                 description:
 *                   type: string
 *                   description: Descripción de la categoría
 *               example:
 *                 name: "Electrónica"
 *                 description: "Productos electrónicos y gadgets"
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", CategoryController.getById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *             required:
 *               - name
 *             example:
 *               name: "Electrónica"
 *               description: "Productos electrónicos y gadgets"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre de la categoría
 *                 description:
 *                   type: string
 *                   description: Descripción de la categoría
 *               example:
 *                 name: "Electrónica"
 *                 description: "Productos electrónicos y gadgets"
 *       400:
 *         description: Datos inválidos
 */
router.post("/", CategoryController.create);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *             required:
 *               - name
 *             example:
 *               name: "Electrónica"
 *               description: "Productos electrónicos y gadgets"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre de la categoría
 *                 description:
 *                   type: string
 *                   description: Descripción de la categoría
 *               example:
 *                 name: "Electrónica"
 *                 description: "Productos electrónicos y gadgets"
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Datos inválidos
 */
router.put("/:id", CategoryController.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       204:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:id", CategoryController.delete);

module.exports = router;

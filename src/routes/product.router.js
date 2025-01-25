const express = require('express');
const ProductController = require('../controllers/product.controller');
const upload = require('../middlewares/upload');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: products
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   pricing:
 *                     type: number
 *                   category_id:
 *                     type: number
 *                   image:
 *                     type: string
 */
router.get('/', ProductController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 pricing:
 *                   type: number
 *                 category_id:
 *                   type: number
 *                 image:
 *                   type: string
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', ProductController.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto, la informacion se debe enviar en un forma data
 *     tags: [products]
 *     requestBody:
 *       required: true
 *       content:
 *           multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               pricing:
 *                 type: number
 *               category_id:
 *                 type: number
 *               image:
 *                 type: Fiel
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 pricing:
 *                   type: number
 *                 category_id:
 *                   type: number
 *                 image:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 */
router.post('/', upload.single('image'), ProductController.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               pricing:
 *                 type: number
 *               category_id:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 pricing:
 *                   type: number
 *                 category_id:
 *                   type: number
 *                 image:
 *                   type: string
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', upload.single('image'), ProductController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', ProductController.delete);

module.exports = router;
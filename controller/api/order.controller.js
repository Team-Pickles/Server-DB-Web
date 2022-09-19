const express = require('express');
const order = require("../../service/order.service.js");
const router = express.Router();

router.post("/", order.applyOrder);

router.get("/", order.getList);

module.exports = router;

/**
 * @swagger
 * /order:
 *   post:
 *     summary: apply order
 *     description: make order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_num
 *               - stuff_id
 *             properties:
 *               order_num:
 *                 type: integer
 *               stuff_id:
 *                 type: integer
 *             example:
 *               order_num: 5
 *               stuff_id: 1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *             example:
 *               order_id: 3
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */ 
 
/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all order list
 *     description: get order list 
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

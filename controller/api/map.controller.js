const express = require('express');
const map = require("../../service/map.service.js");
const router = express.Router();

/**
 * POST: 생성
 * PUT: 전체 수정
 * PATCH: 일부 수정
 */
router.put("/apply", map.applyMap);
router.get("/getAllList", map.getAllMapList);
router.get("/getListByTag/:map_tag", map.getMapListByTag);
router.patch("/update", map.updateMapInfo);
router.delete("/delete/:map_id", map.deleteMap);

/**
 * @swagger
 * /api/map/apply:
 *   put:
 *     summary: Apply map
 *     description: make map
 *     tags: [Map]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - map_info
 *             properties:
 *               map_info:
 *                 type: json
 *             example:
 *               map_info: {
 *                  example: "example"
 *               }
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               map_id:
 *                 type: integer
 *             example:
 *               map_id: 3
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/map/getListByTag/{map_tag}:
 *   get:
 *     summary: Get map list by tag
 *     description: Get map list by tag
 *     tags: [Map]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         map_tag: map_tag
 *         required: true
 *         schema:
 *           type: string
 *         description: Map tag
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               result:
 *                 type: array
 *             example:
 *               $ref: '#/components/schemas/Order'
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/map/getAllList:
 *   get:
 *     summary: Get all map list
 *     description: Get all map list
 *     tags: [Map]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               message:
 *                 type: array
 *             example:
 *               $ref: '#/components/schemas/Order'
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/map/update:
 *   patch:
 *     summary: Update map by map_id
 *     description: Update map by map_id
 *     tags: [Map]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - map_id
 *               - forUpdate
 *             properties:
 *               map_id:
 *                 type: integer
 *               forUpdate:
 *                 type: object
 *             example:
 *               map_id: 1
 *               forUpdate: {
 *                 map_difficulty: 5,
 *                 map_grade: 2
 *               }
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               map_id:
 *                 type: integer
 *             example:
 *               map_id: 3
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/map/delete/{map_id}:
 *   delete:
 *     summary: Delete map by map_id
 *     description: Delete map by map_id
 *     tags: [Map]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         map_tag: map_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Map id
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               result:
 *                 type: string
 *             example:
 *                 message: 'map(${req.params.map_id}) was successfully deleted'
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

module.exports = router;

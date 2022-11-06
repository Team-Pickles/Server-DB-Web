const express = require('express');
const map = require("../../service/map.service.js");
const router = express.Router();
const authJwt = require("../middleware/authJwt");

/**
 * POST: 생성
 * PUT: 전체 수정
 * PATCH: 일부 수정
 */
router.put("/apply", map.applyMap);
router.get("/getAllList", map.getAllMapList);
router.get("/getListByTag/:map_tag", map.getMapListByTag);
router.get("/getMapById/:map_id", map.getMapById);
router.patch("/update", map.updateMapInfo);
router.delete("/delete/:map_id", authJwt, map.deleteMap);

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
 *                 example: "example"
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
 *               [
 *                 {
 *                   "map_id": 1,
 *                   "map_info": {
 *                     "example": "example"
 *                   },
 *                   "map_tag": "none",
 *                   "map_grade": 0,
 *                   "map_difficulty": 0,
 *                   "map_maker": null
 *                 }
 *               ]
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/map/getMapById/:map_id:
 *   get:
 *     summary: Get map by id
 *     description: Get map by id
 *     tags: [Map]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         map_id: map_id
 *         required: true
 *         schema:
 *           type: string
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
 *                 type: object
 *             example:
 *                 {
 *                   "map_id": 1,
 *                   "map_info": {
 *                     "example": "example"
 *                   },
 *                   "map_tag": "none",
 *                   "map_grade": 0,
 *                   "map_difficulty": 0,
 *                   "map_maker": null
 *                 }
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
 *               [
 *                 {
 *                   "map_id": 1,
 *                   "map_info": {
 *                     "example": "example"
 *                   },
 *                 "map_tag": "none",
 *                 "map_grade": 0,
 *                 "map_difficulty": 0,
 *                 "map_maker": null
 *                 },
 *                 {
 *                   "map_id": 2,
 *                   "map_info": {
 *                     "example": "example"
 *                   },
 *                 "map_tag": "example",
 *                 "map_grade": 0,
 *                 "map_difficulty": 0,
 *                 "map_maker": null
 *                 }
 *               ]
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
 *               map_id: 1
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
 *         map_id: map_id
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
 *                 message: 'map(2) was successfully deleted'
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *             example:
 *               {
 *                 "message": "Unauthorized"
 *               }
 */

module.exports = router;

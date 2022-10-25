const express = require('express');
const auth = require('../../service/auth.service');
const authJwt = require("../middleware/authJwt");

const router = express.Router();

router.post("/refresh", auth.refresh);
router.post("/login", auth.login);
router.delete("/logout", authJwt, auth.logout);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with id and password
 *     description: Login with id and password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - password
 *             properties:
 *               user_id:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               user_id: 'userId'
 *               password: 'password'
 *     responses:
 *       "200":
 *         description: Done
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               ok:
 *                 type: bool
 *               data:
 *                 type: object
 *             example:
 *               "ok": true,
 *               "tokens": {
 *                 "accessToken": "accessToken",
 *                 "refreshToken": "refreshToken"
 *               }
 *       "400":
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               message:
 *                 type: string
 *             example:
 *               "message": "Id(or Password) is incorrect"
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh accessToken with refreshToken
 *     description: Refresh accessToken with refreshToken
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         Authorization: Bearer accessToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Authorization
 *       - in: header
 *         refresh: refreshtoken
 *         required: true
 *         schema:
 *           type: string
 *         description: refreshtoken
 *     responses:
 *       "200":
 *         description: Done
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               ok:
 *                 type: bool
 *               data:
 *                 type: object
 *             example:
 *               "ok": true,
 *               "tokens": {
 *                 "accessToken": "accessToken",
 *                 "refreshToken": "refreshToken"
 *               }
 *       "400":
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               ok:
 *                 type: bool
 *               message:
 *                 type: string
 *             example:
 *               "ok": false
 *               "message": "Acess token is not expired!"
 */

/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: Logout
 *     description: Logout
 *     tags: [Auth]
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
 *               result:
 *                 type: string
 *             example:
 *                 message: 'Logout success'
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               ok:
 *                 type: bool
 *               message:
 *                 type: string
 *             example:
 *                 "ok": false
 *                 "message": "Unauthorized"
 */

module.exports = router;
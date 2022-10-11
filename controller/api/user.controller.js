const express = require('express');
const user = require("../../service/user.service.js");
const authJwt = require("../middleware/authJwt");
const router = express.Router();

router.put("/apply", user.applyUser);
router.get("/getAllList", user.getAllUserList);
router.get("/getUserById/:user_id", user.getUserById);
router.patch("/update", user.updateUsername);
router.delete("/delete/:user_id", authJwt, user.deleteUser);

/**
 * @swagger
 * /api/user/apply:
 *   put:
 *     summary: Apply user
 *     description: make user
 *     tags: [User]
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
 *               - username
 *               - password
 *               - email
 *             properties:
 *               user_id:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               user_id: 'userId'
 *               username: 'username'
 *               password: 'password'
 *               email: 'email@example.com'
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               user_id:
 *                 type: string
 *             example:
 *               user_id: userId
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/user/getAllList:
 *   get:
 *     summary: Get all user list
 *     description: Get all user list
 *     tags: [User]
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
 *                   "user_id": "userId",
 *                   "username": "username",
 *                   "password": "password",
 *                   "email": "email@example.com"
 *                 },
 *                 {
 *                   "user_id": "userId2",
 *                   "username": "username2",
 *                   "password": "password",
 *                   "email": "email2@example.com"
 *                 }
 *               ]
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/user/getUserById:
 *   get:
 *     summary: Get user by id
 *     description: Get user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         user_id: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: user_id
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               {
 *                 "user_id": "userId",
 *                 "username": "username",
 *                 "password": "password",
 *                 "email": "email@example.com"
 *               }
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */


/**
 * @swagger
 * /api/user/update:
 *   patch:
 *     summary: Update username by user_id
 *     description: Update username by user_id
 *     tags: [User]
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
 *               - username
 *             properties:
 *               user_id:
 *                 type: string
 *               username:
 *                 type: string
 *             example:
 *               user_id: 'userId'
 *               username: 'newUsername'
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *             example:
 *               "user_id": "userId"
 *       "400":
 *         $ref: '#/components/responses/ApplyError'
 */

/**
 * @swagger
 * /api/user/delete/{user_id}:
 *   delete:
 *     summary: Delete user by user_id
 *     description: Delete user by user_id. You need jwtToken for delete.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         user_id: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: user id
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
 *                 message: 'User(2) was successfully deleted'
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
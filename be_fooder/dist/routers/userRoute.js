"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../middlewares/userValidation");
const profilUpload_1 = __importDefault(require("../middlewares/profilUpload"));
const authorization_1 = require("../middlewares/authorization");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get(`/`, [authorization_1.verifyToken, (0, authorization_1.verifyRole)(["MANAGER"])], userController_1.getAllUsers);
app.get(`/profile`, [authorization_1.verifyToken, (0, authorization_1.verifyRole)(["CASHIER", "MANAGER"])], userController_1.getUserById);
app.post(`/`, [profilUpload_1.default.single("picture"), userValidation_1.verifyAddUser], userController_1.createUser);
app.put(`/:id`, [profilUpload_1.default.single("picture"), userValidation_1.verifyEditUser], userController_1.updateUser);
app.put(`/profile/:id`, [authorization_1.verifyToken, (0, authorization_1.verifyRole)(["CASHIER", "MANAGER"]), profilUpload_1.default.single("picture")], userController_1.changePicture);
app.delete(`/:id`, [authorization_1.verifyToken, (0, authorization_1.verifyRole)(["MANAGER"])], userController_1.deleteUser);
app.post(`/login`, [userValidation_1.verifyAuthentication], userController_1.authentication);
// app.post(`/`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture"), verifyAddUser], createUser)
// app.put(`/:id`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture"), verifyEditUser], updateUser)
// app.put(`/profile/:id`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture")], changePicture)
exports.default = app;
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profile_picture:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: datetime
 *         updatedAt:
 *           type: string
 *           format: datetime
 *       example:
 *         id: 1
 *         name: kasir
 *         email: kasir@gmail.com
 *         password: c7911af3adbd12a035b289556d96470a
 *         profile_picture: 1727836764174-Picture1.png
 *         role: CASHIER
 *         createdAt: 2024-09-27T07:43:59.025Z
 *         updatedAt: 2024-10-29T09:34:34.999Z
 * tags:
 *   name: Users
 *   description: The users managing API
 * /user/login:
 *   post:
 *     summary: Login User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: manager@gmail.com
 *               password: "123"
 *     responses:
 *       200:
 *         description: Login Success
 * /user/profile:
 *   get:
 *     summary: get profile user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: get profile success
 * /user:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */ 

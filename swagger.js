/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Use this endpoint to register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registration successful
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user with email and password
 *     tags: [Users]
 *     requestBody:
 *       description: Login user with email and password
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
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: invalid request
 *       401:
 *         description: Unauthorized
 */

/**
/**
 * @swagger
 * /api/admin/adminRegister:
 *   post:
 *     summary: Register a new admin
 *     description: Use this endpoint to register a new admin
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registration successful
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login admin
 *     description: Login a admin with email and password
 *     tags: [Admin]
 *     requestBody:
 *       description: Login admin with email and password
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
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: invalid request
 *       401:
 *         description: Unauthorized
 */

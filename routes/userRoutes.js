const express = require("express");
const registerUser = require("../controllers/UserLogin")

const router = express.Router();

router.post("/register", registerUser);


// /**
//  * @swagger
//  * /api/users/register:
//  *   post:
//  *     summary: Get the book by id
//  *     tags: [Books]
//  *     requestBody:
//  *    required: true
//  *         content:
//  *            application/json:
//  *         schema:
//  *           type: object
//  *           properties:
//  *             name:
//  *                type: string             
//  *                description: The book id
//  *     responses:
//  *       200:
//  *         description: The book description by id
//  *         contens:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Book'
//  *       404:
//  *         description: The book was not found
//  */
module.exports = router;
// requestBody:
// required: true
// content:
//   application/json:
//     schema:
//       type: object
//       properties:
//         name:
//           type: string
//           description: User's full nam
import express from "express";
import { adminLogin } from "../controllers/authController.js";
import authentication from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/admin', authentication, adminLogin);


export default router;
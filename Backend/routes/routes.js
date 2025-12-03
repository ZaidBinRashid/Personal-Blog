import express from "express";
import { addArticle } from "../controllers/adminController.js";
import authentication from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/addArticle', authentication, addArticle);


export default router;
import express from "express";
import { addArticle, deleteArticle } from "../controllers/adminController.js";
import authentication from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/addArticle', authentication, addArticle);
router.delete('/deleteArticle', authentication, deleteArticle);

export default router;
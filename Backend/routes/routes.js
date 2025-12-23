import express from "express";
import { addArticle, deleteArticleById, getArticles, getArticlebyId, updateArticle} from "../controllers/adminController.js";
import authentication from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/addArticle', authentication, addArticle);
router.delete('/deleteArticle/:id', authentication, deleteArticleById);
router.get('/getArticles', getArticles);
router.get('/getArticleById/:id', getArticlebyId);
router.put('/updateArticle/:id', authentication, updateArticle)

export default router;
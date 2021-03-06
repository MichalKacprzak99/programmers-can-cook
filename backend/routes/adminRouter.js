import express from 'express';
import { adminController } from '../controllers/index.js';

const router = express.Router();

router.post('/add_product', adminController.addProduct);
router.post('/add_product_category',adminController.addProductCategory);
router.post('/add_recipe_category', adminController.addRecipeCategory);
router.post('/add_forum_topic', adminController.addForumTopic);
router.post('/loginAdmin', adminController.loginAdmin);
router.post('/get_users', adminController.getUsers);
router.post('/user_blocking', adminController.blockingUsers);
router.post('/get_messages', adminController.getMessages);
router.post('/get_product_categories', adminController.getProductsCetegories);
router.post('/get_recipe_categories', adminController.getRecipeCetegories);
router.post('/get_recipe', adminController.getRecipe);



export default router;
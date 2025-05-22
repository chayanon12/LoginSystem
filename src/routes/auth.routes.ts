import { Router } from "express";
import AuthController from "../controllers/auth.controller"; 

const router = Router();

router.post('/register', (req, res, next) => {
	Promise.resolve(AuthController.registerController(req, res)).catch(next);
}); 

router.get('/login', (req, res,next) => {
	Promise.resolve(AuthController.loginController(req, res)).catch(next);
});

export default router;

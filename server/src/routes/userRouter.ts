import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from "../controllers/userController";
import registrationValidator from "../validations/registrationValidator";

const router = Router();
const userController = new UserController();
router.get('/responsibles',authMiddleware,userController.getResponsibles);
router.post('/registration',registrationValidator,userController.registrationUser);
router.post("/login",userController.login);
router.get("/auth",authMiddleware,userController.checkAuth);


export default router;
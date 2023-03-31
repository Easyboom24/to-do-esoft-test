import { Router } from "express";
import PriorityController from "../controllers/priorityController"

const router = Router();
const priorityController = new PriorityController();
router.get('/:id',priorityController.getOne);
router.get('/', priorityController.getAll);
router.post('/create', priorityController.createPriority);


export default router;
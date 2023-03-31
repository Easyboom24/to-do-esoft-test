import { Router } from "express";
import taskController from "../controllers/taskController";

const router = Router();

router.post('/create',taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/pages-count', taskController.getPagesCount);
router.get('/:id',taskController.getTask);
router.patch('/update',taskController.updateTask);

export default router;
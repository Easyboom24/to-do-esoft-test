import {Router} from 'express';
import userRouter from "./userRouter";
import statusRouter from "./statusRouter";
import priorityRouter from "./priorityRouter";
import taskRouter from "./taskRouter";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use('/users',userRouter);
router.use('/statuses',authMiddleware,statusRouter);
router.use('/priorities',authMiddleware,priorityRouter);
router.use('/tasks',authMiddleware,taskRouter);


export default router;

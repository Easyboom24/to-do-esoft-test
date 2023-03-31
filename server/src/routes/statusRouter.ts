import {Router} from "express";
import StatusController from "../controllers/statusController";

const router = Router();
const statusController = new StatusController();
router.get("/:id",statusController.getOne);
router.get('/',statusController.getAll);
router.post('/create', statusController.createStatus);


export default router;
import { Router } from "express";
import * as alumnoController from "../controllers/alumno.controller.js";

const router = Router();

router.post("/", alumnoController.create);
router.get("/", alumnoController.getAll);
router.get("/:id", alumnoController.getById);
router.patch("/:id", alumnoController.update);
router.delete("/:id", alumnoController.remove);

export default router;

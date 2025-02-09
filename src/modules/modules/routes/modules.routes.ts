import { Router } from "express";
import { createModule, getModuleById, getModules } from "../controllers/modules.controllers";

const router = Router();

router.route('/')
  .get(getModules)
  .post(createModule);

router.route('/:moduleId')
  .get(getModuleById);

export default router;
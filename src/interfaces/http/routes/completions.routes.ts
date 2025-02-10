import { Router } from "express";
import { createCompletion } from "../controllers/completions.controllers";

const router = Router();

router.route('/')
  .post(createCompletion);

export default router;
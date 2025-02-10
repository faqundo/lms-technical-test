import { Router } from "express";
import { createLesson, getLessonById, getLessons } from "../controllers/lessons.controllers";

const router = Router();

router.route('/')
  .get(getLessons)
  .post(createLesson);

router.route('/:lessonId')
  .get(getLessonById);

export default router;
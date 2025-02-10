import { Router } from 'express';
import { createCourse, getCourseById, getCourses } from '../controllers/courses.controllers';

const router = Router();

router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:courseId')
  .get(getCourseById);

export default router;
import { Router } from 'express';
import { CourseController } from '../controllers/courses.controllers';

const router = Router();
const courseController = new CourseController();


router.route('/')
  //.get(courseController.getCourses)
  .post(courseController.createCourse);

router.route('/:courseId')
  //.get(courseController.getCourseById);

export default router;
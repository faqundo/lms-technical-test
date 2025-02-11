import { Router } from 'express';
import { CourseController } from '../controllers/courses.controllers';

const router = Router();
const courseController = new CourseController();


router.route('/')
  .get(courseController.getCourses)
  .post(courseController.createCourse);

router.route('/:courseId')
  .get(courseController.getCourseById)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse)

export default router;
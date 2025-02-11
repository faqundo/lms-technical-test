import { CourseResponseDTO, CourseResponsePopulatedDTO } from "../../interfaces/http/controllers/courses.controllers";
import { ModuleResponseDTO } from "../../interfaces/http/controllers/modules.controllers";

export class CourseMapper {
  static toDTO(course: any): CourseResponseDTO {
    return {
      id: course.id.toString(),
      title: course.title,
      completion: {
        total_lessons: course.totalLessons || 0,
        completed_lessons: course.completedLessons || 0,
        percentage: course.totalLessons ? Math.round((course.completedLessons / course.totalLessons) * 100) : 0,
      },
    };
  }

  static toPopulatedDTO(course: any): CourseResponsePopulatedDTO {
    return {
      id: course.id.toString(),
      title: course.title,
      completion: {
        total_lessons: course.totalLessons || 0,
        completed_lessons: course.completedLessons || 0,
        percentage: course.percentage || 0
      },
      modules: course.modules?.map((module: any) => ({
        id: module.id.toString(),
        title: module.title,
        course_id: module.course_id.toString(),
        lessons: module.lessons?.map((lesson: any) => ({
          id: lesson.id.toString(),
          title: lesson.title,
          is_completed: lesson.is_completed,
        })) || [],
      })),
    };
  }
}

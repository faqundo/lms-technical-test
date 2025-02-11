// src/application/usecases/GetAllCoursesUseCase.ts
import { ICourseRepository } from "../../application/interfaces/ICourseRepository";
import { CourseResponseDTO } from "../../interfaces/http/controllers/courses.controllers";

export class GetAllCoursesUseCase {
  readonly courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(): Promise<CourseResponseDTO[]> {
    const courses = await this.courseRepository.findAll();

    return courses.map((course) => ({
      id: course.id.toString(),
      title: course.title,
      completion: {
        total_lessons: course.modules.reduce((total, module) => total + module.lessons.length, 0),
        completed_lessons: 0, // No calculamos completado aquí
        percentage: 0, // Porcentaje siempre será 0 sin un userId
      },
    }));
  }
}
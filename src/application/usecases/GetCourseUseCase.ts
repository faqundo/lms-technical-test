import { ICourseRepository } from "../interfaces/ICourseRepository";
import { Course } from "../../domain/entities/Course";
import { CourseResponsePopulatedDTO } from "../../interfaces/http/controllers/courses.controllers";
import { CourseMapper } from "../mappers/courseMapper";
import { calculateCompletedLessons, calculateCompletionPercentage, calculateTotalLessons } from "../../shared/completion.utils";

export class GetCourseUseCase {
  readonly courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }

  /* public async getById(id: number): Promise<Course | null> {
    return this.courseRepository.findById(id);
  } */

    public async getById(id: number, userId?: string): Promise<CourseResponsePopulatedDTO> {
      const course = await this.courseRepository.findByIdWithModulesAndLessons(id);
  
      if (!course) {
        throw new Error("Course not found");
      }
  
      // Calcular total de lecciones
      const totalLessons = calculateTotalLessons(course.modules);
        
      // Calcular lecciones completadas por el usuario
      const completedLessons = userId
      ? calculateCompletedLessons(course.modules, userId)
      : 0;  
      
      // Calcular porcentaje de completado
      const percentage = calculateCompletionPercentage(totalLessons, completedLessons);
      
      const dto = CourseMapper.toPopulatedDTO({
        ...course,
        completion: {
          total_lessons: totalLessons,
          completed_lessons: completedLessons,
          percentage,
        },
      });

      // Construir el DTO
      return dto
    }
}
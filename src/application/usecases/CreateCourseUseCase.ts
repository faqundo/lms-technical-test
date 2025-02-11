import { ICourseRepository } from "../interfaces/ICourseRepository";
import { Course } from "../../domain/entities/Course";

export class CreateCourseUseCase {
  readonly courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(input: CreateCourseInput): Promise<CreateCourseOutput> {
    // Validar los datos de entrada
    if (!input.title || !input.description) {
      throw new Error("Title and description are required");
    }

    // Crear la entidad Course
    const course = new Course();
    course.title = input.title
    course.description = input.description
    
    // Guardar el curso en la base de datos
    const savedCourse = await this.courseRepository.save(course);
    // Devolver el resultado
    return {
      id: savedCourse.id,
      title: savedCourse.title,
      description: savedCourse.description,
    };
  }
}

// DTOs (Data Transfer Objects)
export interface CreateCourseInput {
  title: string;
  description?: string;
}

export interface CreateCourseOutput {
  id: number;
  title: string;
  description?: string;
}
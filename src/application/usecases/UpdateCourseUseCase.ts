// src/application/usecases/UpdateCourseUseCase.ts
import { ICourseRepository } from "../../application/interfaces/ICourseRepository";

export class UpdateCourseUseCase {
  readonly courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(input: UpdateCourseInput): Promise<UpdateCourseOutput | null> {
    const course = await this.courseRepository.findById(input.id);

    if (!course) {
      return null; // Devolver null si no se encuentra el curso
    }

    // Actualizar los campos proporcionados
    if (input.title !== undefined) {
      course.title = input.title;
    }

    if (input.description !== undefined) {
      course.description = input.description;
    }

    // Guardar los cambios en la base de datos
    await this.courseRepository.save(course);

    return {
      id: course.id.toString(),
      title: course.title,
      description: course.description,
    };
  }
}

// DTOs
export interface UpdateCourseInput {
  id: number; // ID del curso a actualizar
  title?: string; // Título (opcional)
  description?: string; // Descripción (opcional)
}

export interface UpdateCourseOutput {
  id: string; // ID del curso actualizado
  title: string; // Título actualizado
  description?: string; // Descripción actualizada
}
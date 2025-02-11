// src/application/usecases/DeleteCourseUseCase.ts
import { ICourseRepository } from "../../application/interfaces/ICourseRepository";

export class DeleteCourseUseCase {
  readonly courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(id: number): Promise<boolean> {
    const result = await this.courseRepository.delete(id);
    return result; // Devuelve true si se eliminó correctamente
  }
}
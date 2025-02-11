// src/application/usecases/CompleteLessonUseCase.ts
import { ILessonRepository } from "../interfaces/ILessonRepository";
import { ICompletionRepository } from "../interfaces/ICompletionRepository";

export class CompleteLessonUseCase {
  readonly lessonRepository: ILessonRepository;
  readonly completionRepository: ICompletionRepository;

  constructor(lessonRepository: ILessonRepository, completionRepository: ICompletionRepository) {
    this.lessonRepository = lessonRepository;
    this.completionRepository = completionRepository;
  }

  public async execute(input: CompleteLessonInput): Promise<void> {
    const { userId, courseId, lessonId } = input;

    // Verificar que la lección exista y pertenezca al curso
    const lesson = await this.lessonRepository.findByIdWithCourse(lessonId);

    if (!lesson || lesson.courseId !== courseId) {
      throw new Error("Lesson not found or does not belong to the specified course");
    }

    // Verificar si ya existe una finalización para esta lección y usuario
    const existingCompletion = await this.completionRepository.findByUserAndLesson(userId, lessonId);

    if (existingCompletion) {
      throw new Error("This lesson has already been completed by the user");
    }

    // Registrar la finalización
    await this.completionRepository.save({
      userId,
      lessonId,
      courseId,
    });
  }
}

// DTOs
export interface CompleteLessonInput {
  userId: string; // ID del usuario
  courseId: number; // ID del curso
  lessonId: number; // ID de la lección
}
import { Lesson } from "../../domain/entities/Lesson";

export interface ILessonRepository {
    save(lesson: Lesson): Promise <any>;
    findById(lessonId: number): Promise<any>; // Obtener una lección por ID
    findByIdWithCourse(lessonId: number): Promise<any>; // Obtener una lección con su curso asociado
    findCourseByLessonId(lessonId: number): Promise<any>;
  }
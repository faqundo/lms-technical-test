export interface ILessonRepository {
    findById(lessonId: number): Promise<any>; // Obtener una lección por ID
    findByIdWithCourse(lessonId: number): Promise<any>; // Obtener una lección con su curso asociado
    findCourseByLessonId(lessonId: number): Promise<any>;
  }
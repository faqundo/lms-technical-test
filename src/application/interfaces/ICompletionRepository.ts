export interface ICompletionRepository {
    save(completion: any): Promise<void>; // Guardar una nueva finalización
    findByUserAndLesson(userId: string, lessonId: number): Promise<any | null>; // Buscar finalización específica
  }
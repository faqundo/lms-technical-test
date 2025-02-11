import { Repository } from "typeorm";
import { Lesson } from "../../domain/entities/Lesson";
import { ILessonRepository } from "../../application/interfaces/ILessonRepository";
import { AppDataSource } from "../database/DataSource";

export class LessonRepository implements ILessonRepository {
  readonly repository: Repository<Lesson>;

  constructor() {
    this.repository = AppDataSource.getRepository(Lesson);
  }

  public async findById(lessonId: number): Promise<any | null> {
    return this.repository.findOne({ where: { id: lessonId } });
  }

  public async findByIdWithCourse(lessonId: number): Promise<any | null> {
    return this.repository.findOne({
      where: { id: lessonId },
      relations: ["module", "module.course"], // Incluye relaciones con módulo y curso
    });
  }

  public async findCourseByLessonId(lessonId: number): Promise<any> {
    const lesson = await this.findByIdWithCourse(lessonId);
    return lesson?.module?.course ?? null;
  }
}
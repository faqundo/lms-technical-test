import { Repository } from "typeorm";
import { Lesson } from "../../domain/entities/Lesson";
import { ILessonRepository } from "../../application/interfaces/ILessonRepository";
import { AppDataSource } from "../database/DataSource";

export class LessonRepository implements ILessonRepository {
  readonly repository: Repository<Lesson>;

  constructor() {
    this.repository = AppDataSource.getRepository(Lesson);
  }

  async save(lesson: Lesson): Promise<any> {
    await this.repository.save(lesson);
  }

  public async findById(lessonId: number): Promise<any> {
    return this.repository.findOne({ where: { id: lessonId } });
  }

  public async findByIdWithCourse(lessonId: number): Promise<any> {
    return this.repository.findOne({
      where: { id: lessonId },
      relations: ["module", "module.course"], // Incluye relaciones con módulo y curso
    });
  }

  public async findCourseByLessonId(lessonId: number): Promise<any> {
    const lesson = await this.findByIdWithCourse(lessonId);
    return lesson?.module?.course ?? null;
  }

  async findAll(): Promise<Lesson[]> {
    return this.repository.find();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected;
  }
}
import { Repository } from "typeorm";
import { Course } from "../../domain/entities/Course";
import { ICourseRepository } from "../../application/interfaces/ICourseRepository";
import { AppDataSource } from "../database/DataSource";

export class CourseRepository implements ICourseRepository {
  readonly repository: Repository<Course>;

  constructor() {
    this.repository = AppDataSource.getRepository(Course);
  }

  async save(course: Course): Promise<any> {
    await this.repository.save(course);
  }

  async findById(id: number): Promise<Course | null> {
    return this.repository.findOneBy({ id });
  }

  async findByIdWithModulesAndLessons(id: number): Promise<any> {
    return this.repository.findOne({
      where: { id },
      relations: ["modules", "modules.lessons", "modules.lessons.completions"],
    });
  }

  async findAll(): Promise<Course[]> {
    return this.repository.find();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected;
  }
}
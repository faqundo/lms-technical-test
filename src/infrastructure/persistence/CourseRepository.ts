import Course from "../../domain/entities/Course";
import { ICourseRepository } from "../../application/interfaces/ICourseRepository";
import AppDataSource from "../database/DataSource";

export class CourseRepository implements ICourseRepository {
  readonly repository = AppDataSource.getRepository(Course);

  async save(course: Course): Promise<void> {
    await this.repository.save(course);
  }

  async findById(id: number): Promise<Course | null> {
    return this.repository.findOneBy({ id: id });
  }

  async findAll(): Promise<Course[]> {
    return this.repository.find();
  }
}
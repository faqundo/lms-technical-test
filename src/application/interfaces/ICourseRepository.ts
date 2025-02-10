import Course from "../../domain/entities/Course";

export interface ICourseRepository {
  save(course: Course): Promise<void>;
  findById(id: number): Promise<Course | null>;
  findAll(): Promise<Course[]>;
}
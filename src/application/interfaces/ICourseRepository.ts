import { Course } from "../../domain/entities/Course";

export interface ICourseRepository {
  save(course: Course): Promise<Course>;
  findById(id: number): Promise<Course | null>;
  findByIdWithModulesAndLessons(id: number): Promise<any>
  findAll(): Promise<Course[]>;
  delete(id: number): Promise<boolean>;
}
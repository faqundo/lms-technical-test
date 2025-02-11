import { Request, Response } from "express";
import { 
  sendMethodNotImplemented,
  sendNotFound,
  sendOk,
  sendBadRequest,
  sendCreated
 } from "../../../shared/responses.utils";
import { ModuleResponseDTO } from "./modules.controllers";
import { CourseRepository } from "../../../infrastructure/persistence/CourseRepository";
import { CreateCourseUseCase } from "../../../application/usecases/CreateCourseUseCase";
import { GetCourseUseCase } from "../../../application/usecases/GetCourseUseCase";
import { UpdateCourseUseCase } from "../../../application/usecases/UpdateCourseUseCase";
import { DeleteCourseUseCase } from "../../../application/usecases/DeleteCourseUseCase";
import { CourseMapper } from "../../../application/mappers/courseMapper";


// DTOs
export interface CourseResponseDTO {
  id: string;
  title: string;
  completion: {
    total_lessons: number;
    completed_lessons: number;
    percentage: number;
  };
}

export interface CourseResponsePopulatedDTO extends CourseResponseDTO {
  modules: (ModuleResponseDTO)[];
}

export class CourseController {
  readonly createCourseUseCase: CreateCourseUseCase;
  readonly getCourseUseCase: GetCourseUseCase;
  readonly updateCourseUseCase: UpdateCourseUseCase;
  readonly deleteCourseUseCase: DeleteCourseUseCase;

  constructor() {
    this.createCourseUseCase = new CreateCourseUseCase(new CourseRepository());
    this.getCourseUseCase = new GetCourseUseCase(new CourseRepository());
    this.updateCourseUseCase = new UpdateCourseUseCase(new CourseRepository());
    this.deleteCourseUseCase = new DeleteCourseUseCase(new CourseRepository());
  }


  // Obtener todos los cursos
  public async getCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await this.getCourseUseCase.execute();
      const dtos = courses.map(CourseMapper.toDTO);
      sendOk(res, dtos);
    } catch (error: any) {
      sendBadRequest(res, error.message);    }
  }

  // Crear un curso
  public async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const createdCourse = await this.createCourseUseCase.execute({ title, description });
      const dto = CourseMapper.toDTO(createdCourse)
      sendCreated(res, dto);
    } catch (error: any) {
      sendBadRequest(res, error.message);
    }
  }

  // Obtener un curso por ID
  public async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        sendBadRequest(res, "Course ID is required");
      }
      const course = await this.getCourseUseCase.getById(parseInt(id, 10));
      if (!course) {
        sendNotFound(res, "Course not found");
      }
      const dto = CourseMapper.toPopulatedDTO(course);
      sendOk(res, dto);
    } catch (error: any) {
      sendBadRequest(res, error.message);
    }
  }

  // Actualizar un curso
  public async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!id || (!title && !description)) {
        sendBadRequest(res, "Course ID and at least one field (title or description) are required");
      }
      const updatedCourse = await this.updateCourseUseCase.execute({
        id: parseInt(id, 10),
        title,
        description,
      });
      if (!updatedCourse) {
        sendNotFound(res, "Course not found");
      }
      const dto = CourseMapper.toDTO(updatedCourse);
      sendOk(res, dto);
    } catch (error: any) {
      sendBadRequest(res, error.message);
    }
  }

  // Eliminar un curso
  public async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        sendBadRequest(res, "Course ID is required");
      }
      const result = await this.deleteCourseUseCase.execute(parseInt(id, 10));
      if (!result) {
        sendNotFound(res, "Course not found");
      }
      res.status(204).send(); // No content
    } catch (error: any) {
      sendBadRequest(res, error.message);
    }
  }
}
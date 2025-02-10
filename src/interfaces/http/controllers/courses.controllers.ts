import { Request, Response } from "express";
import { sendMethodNotImplemented } from "../../../shared/responses.utils";
import { ModuleResponseDTO, ModuleResponsePopulatedDTO } from "./modules.controllers";
import { CreateCourseUseCase } from "../../../application/usecases/CreateCourseUseCase";
import { CourseRepository } from "../../../infrastructure/persistence/CourseRepository";
export interface CourseResponseDTO {
  id: string;
  title: string;
  completion: {
    total_lessons: number;
    completed_lessons: number;
    percentage: number;
  }
}

export interface CourseResponsePopulatedDTO extends CourseResponseDTO {
  modules: (ModuleResponseDTO | ModuleResponsePopulatedDTO)[];
}

export class CourseController {
  private createCourseUseCase: CreateCourseUseCase;

constructor() {
  this.createCourseUseCase = new CreateCourseUseCase(new CourseRepository());
}

/* export const createCourse = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
}; */

public async createCourse(req: Request, res: Response): Promise<void> {  try {
    const { title, description } = req.body;

    const result = await this.createCourseUseCase.execute({
      title,
      description,
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/* export const getCourseById = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

export const getCourses = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
}; */

}
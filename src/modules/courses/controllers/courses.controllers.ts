import { Request, Response } from "express";
import { sendMethodNotImplemented } from "../../../shared/responses.utils";
import { ModuleResponseDTO, ModuleResponsePopulatedDTO } from "../../modules/controllers/modules.controllers";

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

export const createCourse = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

export const getCourseById = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

export const getCourses = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

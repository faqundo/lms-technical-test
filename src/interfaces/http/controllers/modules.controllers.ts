import { Request, Response } from "express";
import { sendMethodNotImplemented } from "../../../shared/responses.utils";
import { LessonResponseDTO } from "../../../interfaces/http/controllers/lessons.controllers";

export interface ModuleResponseDTO {
  id: string;
  title: string;
  course_id: string;
  lessons: LessonResponseDTO;

}

export const createModule = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

export const getModuleById = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

export const getModules = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

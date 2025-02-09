import { Request, Response } from "express";
import { sendMethodNotImplemented } from "../../../shared/responses.utils";
import { LessonResponseDTO } from "../../lessons/controllers/lessons.controllers";

export interface ModuleResponseDTO {
  id: string;
  title: string;
  is_root_module: boolean;
  module_id: string;
  course_id: string;
}

export interface ModuleResponsePopulatedDTO extends ModuleResponseDTO {
  lessons: LessonResponseDTO[];
  modules: ModuleResponsePopulatedDTO[];
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

import { Request, Response } from "express";
import { sendMethodNotImplemented } from "../../../shared/responses.utils";

export interface LessonResponseDTO {
  id: string;
  title: string;
  module_id: string;
  is_completed: boolean;
}

export const createLesson = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

export const getLessonById = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};

export const getLessons = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};  
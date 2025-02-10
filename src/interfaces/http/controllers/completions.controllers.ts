import { Request, Response } from "express";
import { sendMethodNotImplemented } from "../../../shared/responses.utils";

export const createCompletion = async (req: Request, res: Response) => {
  return sendMethodNotImplemented(res);
};
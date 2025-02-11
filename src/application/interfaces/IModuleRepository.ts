import { Module } from "../../domain/entities/Module";

export interface IModuleRepository {
  save(module: Module): Promise<any>;
  findById(id: number): Promise<Module | null>;
  findAll(): Promise<Module[]>;
  delete(id: number): Promise<boolean>;
}

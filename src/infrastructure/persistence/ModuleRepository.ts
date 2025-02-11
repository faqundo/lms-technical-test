import { Repository } from "typeorm";
import { Module } from "../../domain/entities/Module";
import { IModuleRepository } from "../../application/interfaces/IModuleRepository";
import { AppDataSource } from "../database/DataSource";

export class ModuleRepository implements IModuleRepository {
  readonly repository: Repository<Module>;

  constructor() {
    this.repository = AppDataSource.getRepository(Module);
  }

  async save(module: Module): Promise<any> {
    return this.repository.save(module);
  }

  async findById(id: number): Promise<Module | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["course"], // Si necesitas acceder al curso asociado
    });
  }

  async findAll(): Promise<Module[]> {
    return this.repository.find({
      relations: ["course"], // Si necesitas acceder a los cursos asociados
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected;
  }
}

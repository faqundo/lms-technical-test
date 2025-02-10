import { DataSource } from "typeorm";
import Course from "../../../domain/entities/Course";
import Module from "../../../domain/entities/Module";
import Lesson from "../../../domain/entities/Lesson";
import Completion from "../../../domain/entities/Completion";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "mysql", // Nombre del servicio MySQL en docker-compose.yml
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  entities: [Course, Module, Lesson, Completion], // Agrega aquí todas las entidades
  synchronize: false, // Desactiva sincronización automática
  logging: true, // Habilita logs de consultas
});

export default AppDataSource;
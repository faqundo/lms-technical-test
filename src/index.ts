/* import express from 'express';
import cors from 'cors';

import CourseRoutes from './interfaces/http/routes/courses.routes';
import ModuleRoutes from './interfaces/http/routes/modules.routes';
import LessonRoutes from './interfaces/http/routes/lessons.routes';
import CompletionRoutes from './interfaces/http/routes/completions.routes';

const PORT = 3124;

const apiService = express();

apiService.use(cors());
apiService.use(express.json({}));
apiService.use(express.urlencoded({ extended: true }));

apiService.use('/courses', CourseRoutes);
apiService.use('/modules', ModuleRoutes);
apiService.use('/lessons', LessonRoutes);
apiService.use('/completions', CompletionRoutes);

const server = apiService.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default apiService;
export { server }; */


// src/index.ts
import { AppDataSource } from "./infrastructure/database/DataSource";
import { ExpressServer } from "./infrastructure/web/ExpressServer";

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    // Crear e iniciar el servidor Express
    const server = new ExpressServer();
    server.listen(3000); // Puerto 3000
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
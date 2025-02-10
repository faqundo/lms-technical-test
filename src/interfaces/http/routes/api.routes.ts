import { Router } from "express";
import CourseRoutes from "./courses.routes";
import ModuleRoutes from "./modules.routes";
import LessonRoutes from "./lessons.routes";
import CompletionRoutes from "./completions.routes";

const apiRouter = Router();

// Agrega aquí todas las rutas con el prefijo /api
apiRouter.use("/courses", CourseRoutes);
apiRouter.use("/modules", ModuleRoutes);
apiRouter.use("/lessons", LessonRoutes);
apiRouter.use("/completions", CompletionRoutes);

export default apiRouter;
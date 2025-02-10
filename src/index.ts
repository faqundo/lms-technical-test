import express from 'express';
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
export { server };
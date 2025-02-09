import express from 'express';
import cors from 'cors';

import CourseRoutes from './modules/courses/routes/courses.routes';
import ModuleRoutes from './modules/modules/routes/modules.routes';
import LessonRoutes from './modules/lessons/routes/lessons.routes';
import CompletionRoutes from './modules/completions/routes/completions.routes';

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
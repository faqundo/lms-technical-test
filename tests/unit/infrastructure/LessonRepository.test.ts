// tests/unit/infrastructure/LessonRepository.test.ts
import { LessonRepository } from "../../../src/infrastructure/persistence/LessonRepository";
import { AppDataSource } from "../../../src/infrastructure/database/DataSource";

describe("LessonRepository", () => {
  let repository: LessonRepository;

  beforeEach(async () => {
    await AppDataSource.initialize();
    repository = new LessonRepository();
  });

  afterEach(async () => {
    await AppDataSource.destroy();
  });

  it("should find the course associated with a lesson", async () => {
    const lessonId = 1;

    const course = await repository.findCourseByLessonId(lessonId);

    expect(course).not.toBeNull();
    expect(course.id).toBeGreaterThan(0); // Asumiendo que el ID del curso es numérico
  });

  it("should return null if the lesson does not exist", async () => {
    const invalidLessonId = 999;

    const course = await repository.findCourseByLessonId(invalidLessonId);

    expect(course).toBeNull();
  });
});
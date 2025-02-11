// tests/unit/application/GetCourseUseCase.test.ts
import { GetCourseUseCase } from "../../../src/application/usecases/GetCourseUseCase";
import { ICourseRepository } from "../../../src/application/interfaces/ICourseRepository";

describe("GetCourseUseCase", () => {
  let useCase: GetCourseUseCase;
  let mockRepository: jest.Mocked<ICourseRepository>;

  beforeEach(() => {
    mockRepository = {
      findByIdWithModulesAndLessons: jest.fn(),
    } as unknown as jest.Mocked<ICourseRepository>;

    useCase = new GetCourseUseCase(mockRepository);
  });

  it("should return a course with progress", async () => {
    const mockCourse = {
      id: 1,
      title: "Test Course",
      modules: [
        {
          id: 1,
          title: "Module 1",
          lessons: [
            { id: 1, title: "Lesson 1.1", completions: [{ userId: "123" }] },
            { id: 2, title: "Lesson 1.2", completions: [] },
          ],
        },
      ],
    };

    mockRepository.findByIdWithModulesAndLessons.mockResolvedValue(mockCourse);
    const result = await useCase.getById(1, "123");
    expect(result).toEqual({
      id: "1",
      title: "Test Course",
      completion: {
        total_lessons: 2,
        completed_lessons: 1,
        percentage: 50,
      },
      modules: [
        {
          id: "1",
          title: "Module 1",
          course_id: "1",
          lessons: [
            { id: "1", title: "Lesson 1.1", is_completed: true },
            { id: "2", title: "Lesson 1.2", is_completed: false },
          ],
        },
      ],
    });
  });
});
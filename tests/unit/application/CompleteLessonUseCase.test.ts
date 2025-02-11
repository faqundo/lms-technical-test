// tests/unit/application/CompleteLessonUseCase.test.ts
import { CompleteLessonUseCase } from "../../../src/application/usecases/CompleteLessonUseCase";
import { ILessonRepository } from "../../../src/application/interfaces/ILessonRepository";
import { ICompletionRepository } from "../../../src/application/interfaces/ICompletionRepository";

describe("CompleteLessonUseCase", () => {
  let useCase: CompleteLessonUseCase;
  let mockLessonRepository: jest.Mocked<ILessonRepository>;
  let mockCompletionRepository: jest.Mocked<ICompletionRepository>;

  beforeEach(() => {
    mockLessonRepository = {
      findByIdWithCourse: jest.fn(),
    } as unknown as jest.Mocked<ILessonRepository>;

    mockCompletionRepository = {
      findByUserAndLesson: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<ICompletionRepository>;

    useCase = new CompleteLessonUseCase(mockLessonRepository, mockCompletionRepository);
  });

  it("should complete a lesson successfully", async () => {
    const input = {
      userId: "123",
      courseId: 1,
      lessonId: 1,
    };

    mockLessonRepository.findByIdWithCourse.mockResolvedValue({
      id: 1,
      title: "Lesson 1.1",
      courseId: 1,
    });

    mockCompletionRepository.findByUserAndLesson.mockResolvedValue(null);

    await useCase.execute(input);

    expect(mockCompletionRepository.save).toHaveBeenCalledWith({
      userId: "123",
      lessonId: 1,
      courseId: 1,
    });
  });

  it("should throw an error if the lesson does not exist", async () => {
    const input = {
      userId: "123",
      courseId: 1,
      lessonId: 1,
    };

    mockLessonRepository.findByIdWithCourse.mockResolvedValue(null);

    await expect(useCase.execute(input)).rejects.toThrow("Lesson not found or does not belong to the specified course");
  });
});
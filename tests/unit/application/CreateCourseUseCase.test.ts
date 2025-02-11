// tests/unit/application/CreateCourseUseCase.test.ts
import { CreateCourseUseCase } from "../../../src/application/usecases/CreateCourseUseCase";
import { ICourseRepository } from "../../../src/application/interfaces/ICourseRepository";
import { Course } from "../../../src/domain/entities/Course";

describe("CreateCourseUseCase", () => {
  let useCase: CreateCourseUseCase;
  let mockRepository: jest.Mocked<ICourseRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<ICourseRepository>;

    useCase = new CreateCourseUseCase(mockRepository);
  });

  it("should create a new course", async () => {
    const input = {
      title: "Test Course",
      description: "This is a test course",
    };

    const mockCourse = new Course();
    mockCourse.id = 1;
    mockCourse.title = input.title;
    mockCourse.description = input.description;

    mockRepository.save.mockResolvedValue(mockCourse);

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: "1", // Convertido a string
      title: "Test Course",
      description: "This is a test course",
    });

    expect(mockRepository.save).toHaveBeenCalledWith(expect.any(Course));
  });

  it("should throw an error if title is missing", async () => {
    const input = {
      description: "This is a test course",
    };

    await expect(useCase.execute(input as any)).rejects.toThrow("Title and description are required");
  });

  it("should throw an error if description is missing", async () => {
    const input = {
      title: "Test Course",
    };

    await expect(useCase.execute(input as any)).rejects.toThrow("Title and description are required");
  });
});
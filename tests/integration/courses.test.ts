// tests/integration/courses.integration.test.ts
import request from "supertest";
import { AppDataSource } from "../../src/infrastructure/database/DataSource";
import { CacheService } from "../../src/shared/cache";
import app from "../../src/index"

describe("Courses Integration Tests", () => {
  beforeAll(async () => {
    await AppDataSource.initialize(); // Inicializa la conexión a la base de datos
  });

  afterAll(async () => {
    await AppDataSource.destroy(); // Cierra la conexión a la base de datos
    await CacheService.getInstance().delete("courses:list"); // Limpia la caché después de las pruebas
  });

  it("should return cached courses", async () => {
    const response = await request(app).get("/api/courses");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Verifica que devuelve una lista de cursos
  });
});
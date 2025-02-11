import "reflect-metadata";
import AppDataSource from "../../../../src/infrastructure/database/DataSource";
import { Course } from "../../../../src/domain/entities/Course";

async function testInsert() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Conectado a la base de datos!");

    // Crear un nuevo curso
    const courseRepo = AppDataSource.getRepository(Course);
    const newCourse = courseRepo.create({
      id: 1,
      title: "Curso de prueba",
      description: "Este es un curso de prueba",
    });

    await courseRepo.save(newCourse);
    console.log("🎉 Curso guardado correctamente:", newCourse);

    // Verificar si se guardó
    const courses = await courseRepo.find();
    console.log("📋 Cursos en la base de datos:", courses);

    await AppDataSource.destroy(); // Cierra la conexión
  } catch (error) {
    console.error("❌ Error al insertar datos:", error);
  }
}

testInsert();

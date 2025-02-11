import "reflect-metadata";
import AppDataSource from "../../../../src/infrastructure/database/DataSource";

async function testConnection() {
  try {
    console.log("🔄 Conectando a la base de datos...");
    await AppDataSource.initialize();
    console.log("✅ Conexión exitosa!");

    // Prueba haciendo una consulta a la base de datos
    const result = await AppDataSource.query("SHOW DATABASES;");
    console.log("📋 Bases de datos disponibles:", result);
    
    await AppDataSource.destroy(); // Cierra la conexión
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
}

testConnection();

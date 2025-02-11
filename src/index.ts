import { AppDataSource } from "./infrastructure/database/DataSource";
import { ExpressServer } from "./infrastructure/web/ExpressServer";

const server = new ExpressServer();
const app = server.app

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");
    const PORT = 3124;
    // Crear e iniciar el servidor Express
    server.listen(PORT); // Puerto 3124     
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

  export default app
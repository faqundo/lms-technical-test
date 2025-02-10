// src/infrastructure/web/ExpressServer.ts
import express from "express";
import cors from "cors";
import apiRoutes from "../../interfaces/http/routes/api.routes";

export class ExpressServer {
  private app: express.Application;

  constructor() {
    this.app = express();

    // Middleware
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Rutas con prefijo /api/
    this.app.use("/api", apiRoutes);


    // Manejador de rutas no encontradas
    this.app.use((req, res) => {
      res.status(404).json({ error: "Route not found" });
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
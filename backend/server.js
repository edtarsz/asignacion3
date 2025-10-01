import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import carreraRoutes from "./src/routes/carrera.routes.js";
import alumnoRoutes from "./src/routes/alumno.routes.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/carreras", carreraRoutes);
app.use("/api/v1/alumnos", alumnoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
import express from "express";
import cors from "cors";
import carreraRoutes from "./src/routes/carrera.routes.js";
import alumnoRoutes from "./src/routes/alumno.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/carreras", carreraRoutes);
app.use("/api/v1/alumnos", alumnoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

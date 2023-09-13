import express from "express";
import employeeRoutes from "./routes/employee-route";

const app = express();

app.use(express.json());

app.use(employeeRoutes);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

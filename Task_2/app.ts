import express from "express";
import cors from "cors"
import morgan from "morgan";
import indexRoutes from "./routes/index.routes"

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", indexRoutes)
app.use(morgan("dev"))
app.use(cors({
    credentials: true
}))
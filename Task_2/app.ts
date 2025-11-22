import express from "express";
import cors from "cors"
import morgan from "morgan";
import indexRoutes from "./routes/index.routes"
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.middleware";
dotenv.config();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import logger from "./utils/logger";

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);
app.use("/api/v1", indexRoutes)
app.use(cors({
    credentials: true
}))
app.use(errorMiddleware)
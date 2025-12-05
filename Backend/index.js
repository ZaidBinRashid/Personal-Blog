import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import cors from "cors";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin:process.env.CORS_ORIGIN,credentials: true }));
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

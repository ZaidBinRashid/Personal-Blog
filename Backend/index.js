import express from "express";
import dotenv from "dotenv";

import routes from "./routes/routes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.use("/api", routes);

app.get('/', (req, res) => {
  res.send("Home Page")
})


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

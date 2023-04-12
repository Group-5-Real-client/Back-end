import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";
import aboutUsRoutes from "./Routes/aboutUsRoute.js";
const routes = require("./Routes");

dotenv.config();
await connectDB();
const PORT = process.env.PORT || 5000;
const app = new express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use("/", routes);
app.use("/aboutUs", aboutUsRoutes);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running ...");
});

app.listen(
    PORT,
    console.log(
        `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}  `
    )
);

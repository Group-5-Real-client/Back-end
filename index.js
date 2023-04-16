import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";
import AdminRouter from "./Routes/Admin_Routes.js";
import UserRouter from "./Routes/User_Routes.js";
import CategoryRouter from "./Routes/Categories_Routes.js";
import FormRouter from "./Routes/ContactUs_Routes.js";
import productRouters from "./Routes/product.js";
import ReviewRouter from './Routes/Review_Routes.js'
import aboutUsRoutes from "./Routes/aboutUsRoute.js";
import bodyParser from "body-parser";

dotenv.config();

await connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("API is running ...");
});

app.use("/api/aboutUs", aboutUsRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/form", FormRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/product", productRouters);
app.use("/api/review",ReviewRouter)
app.use("/uploads", express.static("./uploads"));

app.listen(
    PORT,
    console.log(
        `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}  `
    )
);

import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import ErrorHandler from "./middlewares/serverErrorHandler";
import router from "./routes/index";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api',router);
app.use('*',ErrorHandler.clientErrorHandler);
app.use(ErrorHandler.serverErrorHandler);

app.listen(PORT, () => {console.log(`Server started. Port ${PORT}`)});

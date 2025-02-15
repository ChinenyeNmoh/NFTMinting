import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import dotenv from "dotenv";
import { notFound } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import nftRoutes from "./routes/nftRoute.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet()); // Auto-secure headers


// CORS: Allow only specific origins 
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Define __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path to our static folders
app.use(express.static(path.join(__dirname, "public")));

// Logging using morgan middleware only if we are in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/nfts", nftRoutes);


// Error handling middleware
app.use(notFound);


app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

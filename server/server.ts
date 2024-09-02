import * as path from "path";
import * as dotenv from "dotenv";
import app from "./app";
import connectDB from "./utils/db";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const ___rootDir = path.dirname(__filename); // server
dotenv.config({ path: path.resolve(___rootDir, "../", ".env") });

const PORT = process.env.VITE_BACKEND_PORT || 4001;

const startServer = async () => {
  try {
    await connectDB();
    console.log(path.resolve(___rootDir, "../", ".env"));

    console.log();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

startServer();

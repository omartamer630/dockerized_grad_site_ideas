import * as path from "path";
import * as dotenv from "dotenv";
import app from "./app";
import fs from "fs";
import connectDB from "./utils/db";
import { fileURLToPath } from "url";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const ___rootDir = path.dirname(__filename); // server
dotenv.config({ path: path.resolve(___rootDir, "../", ".env") });

const key = path.join(___rootDir, "certs", "key.pem");
const cert = path.join(___rootDir, "certs", "cert.pem");

const PORT = process.env.VITE_BACKEND_PORT || 4001;

const startServer = async () => {
  try {
    await connectDB();
    const sllServer = https.createServer(
      { key: fs.readFileSync(key), cert: fs.readFileSync(cert) },
      app
    );
    sllServer.listen(PORT, () => {
      console.log(`Server running on https://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

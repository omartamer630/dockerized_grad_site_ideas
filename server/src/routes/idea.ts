import { Router } from "express";
import {
  addIdea,
  getIdeas,
  getIdea,
  editIdea,
  deleteIdea,
} from "../controllers/controller";
import { addMiddleware, editMiddleware } from "../middlewares/middleware";
const router = Router();

router.get("/:id", getIdea);

router.put("/:id", editMiddleware, editIdea);

router.delete("/:id", deleteIdea);

router.post("/", addMiddleware, addIdea);

router.get("/", getIdeas);

export default router;

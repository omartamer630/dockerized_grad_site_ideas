import { Request, Response } from "express";
import IDEA from "../models/idea";
import { IdeaProps } from "../types";

export const addIdea = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const idea: IdeaProps = await IDEA.create({ ...data });
    res.status(201).json(idea._id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error While Adding Idea" });
  }
};

export const getIdeas = async (req: Request, res: Response) => {
  try {
    const { q } = req.query ?? "";

    const queryStr = typeof q === "string" ? q.trim() : "";

    const searchQuery =
      q && typeof q === "string" && q.trim() !== ""
        ? {
            $or: [
              { title: { $regex: q, $options: "i" } },
              { content: { $regex: q, $options: "i" } },
            ],
          }
        : {};

    const ideas = await IDEA.find(searchQuery).sort({ updatedAt: -1 });
    const response =
      queryStr !== "" && ideas.length === 0
        ? "No Ideas found"
        : "No Ideas Added Yet";

    res.status(200).json({ message: response, ideas: ideas });
  } catch (error) {
    console.error("Error while fetching ideas:", error);
    res.status(500).json({ message: "Error while fetching ideas" });
  }
};

export const getIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const idea: IdeaProps | null = await IDEA.findById(id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.status(200).json(idea);
  } catch (error) {
    console.error("Error while fetching idea:", error);
    res.status(500).json({ message: "Error while fetching idea" });
  }
};

export const editIdea = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    await IDEA.findByIdAndUpdate(id, { ...data, updatedAt: new Date() });

    return res.status(200).json(id);
  } catch (error) {
    console.error("Error while editing idea:", error);
    res.status(500).json({ message: "Error while editing idea" });
  }
};

export const deleteIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const idea = await IDEA.findByIdAndDelete(id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.status(204).json(); // 204 has no body
  } catch (error) {
    console.error("Error while deleting idea:", error);
    res.status(500).json({ message: "Error while deleting idea" });
  }
};

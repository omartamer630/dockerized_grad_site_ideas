import { NextFunction, Request, Response } from "express";
import { IdeaProps, NewIdeaProps } from "../types";
import { getIdeSchema, validateWithSchema } from "../../utils";
import { ZodError } from "zod";
import { IDEA } from "../models/idea";

export const addMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body as NewIdeaProps;
    if (!data) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    const schema = getIdeSchema();
    await schema.parseAsync(data);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(validateWithSchema(error));
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const editMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = req.body as NewIdeaProps;
    if (!data) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    const idea: IdeaProps | null = await IDEA.findById(id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const hasChange = Object.keys(data).some(
      (key) => data[key] !== idea[key as keyof IdeaProps]
    );

    if (!hasChange) {
      return res.status(400).json({
        titleOrContent: "You must change at least one field (title or content)",
      });
    }

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(validateWithSchema(error));
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

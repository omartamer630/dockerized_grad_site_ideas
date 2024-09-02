/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError, object, string } from "zod";

export const validateWithSchema = (error: ZodError) => {
  if (error instanceof ZodError) {
    const errors = error.errors.reduce((acc: Record<string, string>, curr) => {
      acc[curr.path.join(".")] = curr.message;
      return acc;
    }, {});
    return errors; // Return the errors object
  }

  return null; // Return null if the error is not a ZodError
};

export const getIdeSchema = () => {
  return object({
    title: string().min(3, "Minimum Length for title is 3 characters").max(100),
    content: string()
      .min(10, "Minimum Length for content is 10 characters")
      .max(10000),
  });
};

export const getEditIdeaSchema = (oTitle: string, oContent: string) => {
  return object({
    title: string()
      .min(3, "Minimum length for title is 3 characters")
      .max(100)
      .optional(),
    content: string()
      .min(10, "Minimum length for content is 10 characters")
      .max(10000)
      .optional(),
  }).superRefine((data, ctx) => {
    const { title, content } = data;
    const changes: Record<string, any> = {}; // Object to hold only changed fields

    // Check if title has changed
    if (title !== oTitle) {
      changes.title = title;
    }

    // Check if content has changed
    if (content !== oContent) {
      changes.content = content;
    }

    if (Object.keys(changes).length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "You must change at least one field (title or content)",
        path: ["titleOrContent"],
      });
    }

    (ctx as any).changes = changes;
  });
};

export const isIdeaError = (error: Record<string, string>) => {
  return error && Object.values(error).some((val) => typeof val === "string");
};

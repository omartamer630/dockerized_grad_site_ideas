import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const IDEA = mongoose.models.IDEA || mongoose.model("IDEA", ideaSchema);

export default IDEA;

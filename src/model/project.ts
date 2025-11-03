import mongoose, { Schema, Document, models } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  details: string;
  image: {
    url: string;
    publicId?: string;
  };
  techStack: string[];
  category: string;
  url: string;
  github: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    techStack: { type: [String], required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
    github: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project =
  models.Project || mongoose.model<IProject>("Project", ProjectSchema);

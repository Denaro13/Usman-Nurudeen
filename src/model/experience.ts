import mongoose, { Schema, Document, models } from "mongoose";

export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  createdAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    achievements: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Experience =
  models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

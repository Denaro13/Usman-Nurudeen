import { z } from "zod";

export const ExperienceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  achievements: z.array(z.string().min(1, "Achievement cannot be empty")),
});

export type ExperienceData = z.infer<typeof ExperienceSchema>;

export const UpdateExperienceSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(2, "Title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  achievements: z.array(z.string().min(1, "Achievement cannot be empty")),
});

export type UpdateExperienceData = z.infer<typeof UpdateExperienceSchema>;

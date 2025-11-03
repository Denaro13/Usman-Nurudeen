import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  details: z.string().min(2, "Details are required"),
  techStack: z.array(z.string().min(1, "Tech stack item cannot be empty")),
  category: z.string().min(2, "Category is required"),
  url: z.string().min(1, "Project URL is required"),
  github: z.string().min(1, "GitHub URL is required"),
});

export type ProjectData = z.infer<typeof ProjectSchema>;

export const UpdateProjectSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  details: z.string().min(2, "Details are required"),
  techStack: z.array(z.string().min(1, "Tech stack item cannot be empty")),
  category: z.string().min(2, "Category is required"),
  url: z.string().min(1, "Project URL is required"),
  github: z.string().min(1, "GitHub URL is required"),
});

export type UpdateProjectData = z.infer<typeof UpdateProjectSchema>;

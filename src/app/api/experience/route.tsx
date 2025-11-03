import { connectDB } from "@/lib/mongodb";
import ValidationMiddleware from "@/middleware/validation";
import { Experience } from "@/model/experience";

import { ExperienceSchema, UpdateExperienceSchema } from "@/schemas/experience";

export async function GET() {
  try {
    await connectDB();

    const experiences = await Experience.find().sort({ startDate: -1 });
    return Response.json({ data: experiences }, { status: 200 });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return Response.json(
      { message: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { data } = await req.json();
    console.log(data);

    const parsed = ExperienceSchema.safeParse(data);
    console.log(parsed);

    if (!parsed.success) {
      const { error } = parsed;
      return Response.json(
        {
          message: `${String(error.issues[0].path[0])} ${error.issues[0].message}`,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await Experience.create(parsed.data);

    return Response.json(
      { message: "Your experience has been saved" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving experience:", error);
    return Response.json(
      { message: "An error occurred while saving experience" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { data } = await req.json();
    // console.log(data);

    const parsed = UpdateExperienceSchema.safeParse(data);
    console.log(parsed);

    if (!parsed.success) {
      const { error } = parsed;
      return Response.json(
        {
          message: `${String(error.issues[0].path[0])} ${error.issues[0].message}`,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const experience = await Experience.findByIdAndUpdate(
      parsed.data.id,
      parsed.data,
      { new: true }
    );

    if (!experience) {
      return Response.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Experience updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating experience:", error);
    return Response.json(
      { message: "An error occurred while updating experience" },
      { status: 500 }
    );
  }
}

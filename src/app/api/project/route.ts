import { uploadImage } from "@/lib/image";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/model/project";
import { ProjectSchema } from "@/schemas/project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ createAt: -1 });
    return Response.json({ data: projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const data = JSON.parse(formData.get("data") as string);
    const file = formData.get("image") as File | null;
    console.log("data:", data);
    console.log("file:", file);

    const parsed = ProjectSchema.safeParse(data);

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let uploadedImage: any;
    if (file) {
      //   const buffer = Buffer.from(await file.arrayBuffer());
      const bytes = await file.arrayBuffer();
      const imageBuffer = Buffer.from(bytes);
      uploadedImage = await uploadImage(imageBuffer, "Portfolio/Projects");
    }

    await Project.create({
      ...parsed.data,
      image: {
        url: uploadedImage ? uploadedImage.url : null,
        publicId: uploadedImage ? uploadedImage.publicId : null,
      },
    });

    return Response.json(
      { message: "Your project has been added" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding project:", error);
    return Response.json(
      { message: "An error occurred while adding project" },
      { status: 500 }
    );
  }
}

// export async function PUT(req: Request) {
//   try {
//     await connectDB();
//     const { data } = await req.json();
//     // console.log(data);

//     const parsed = UpdateExperienceSchema.safeParse(data);
//     console.log(parsed);

//     if (!parsed.success) {
//       const { error } = parsed;
//       return Response.json(
//         {
//           message: `${String(error.issues[0].path[0])} ${error.issues[0].message}`,
//           errors: parsed.error.flatten().fieldErrors,
//         },
//         { status: 400 }
//       );
//     }

//     const experience = await Experience.findByIdAndUpdate(
//       parsed.data.id,
//       parsed.data,
//       { new: true }
//     );

//     if (!experience) {
//       return Response.json(
//         { message: "Experience not found" },
//         { status: 404 }
//       );
//     }

//     return Response.json(
//       { message: "Experience updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating experience:", error);
//     return Response.json(
//       { message: "An error occurred while updating experience" },
//       { status: 500 }
//     );
//   }
// }

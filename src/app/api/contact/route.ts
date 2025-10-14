import { sendEmail } from "@/lib/emailService";
import { connectDB } from "@/lib/mongodb";
import { renderTemplate } from "@/lib/template";
import { ContactMessage } from "@/model/contactMessage";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { data }: { data: ContactFormData } = await req.json();

    const html = await renderTemplate({
      type: "contactUs",
      props: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    await sendEmail({
      to: "usmannurudeen13@gmail.com",
      subject: `New contact form submission: ${data.subject}`,
      body: html,
    });

    // console.log("Data:", data);
    await ContactMessage.create({ ...data });

    return Response.json(
      { message: "Your message has been received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return Response.json(
      { message: "An error occurred while processing your message" },
      { status: 500 }
    );
  }
}

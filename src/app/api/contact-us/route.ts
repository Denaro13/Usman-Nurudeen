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
  await connectDB();
  const { data }: { data: ContactFormData } = await req.json();
  // console.log("Data:", data);
  await ContactMessage.create({ ...data });

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
  return Response.json(
    { message: "Your message has been received" },
    { status: 200 }
  );
}

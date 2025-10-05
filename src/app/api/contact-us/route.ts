export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  const { data }: { data: ContactFormData } = await req.json();
  console.log(data);
  return Response.json({ message: "Message received" }, { status: 200 });
}

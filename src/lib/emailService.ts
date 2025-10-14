import nodemailer, { Transporter } from "nodemailer";
import { Resend } from "resend";

// const transport: Transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     //   type: "OAuth2",
//     user: "pipointedu@gmail.com",
//     pass: "avng nruv dhoh dukn",
//     //   clientId: this.id,
//     //   clientSecret: this.secret,
//     //   refreshToken: this.refreshToken,
//   },
// });

const transport: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
  },
});

const resend = new Resend(process.env.RESEND_API_KEY);
const node_env = process.env.NODE_ENV;

export async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  // console.log("node env", node_env);

  try {
    // await resend.emails.send({
    //   from: "Usman <usmannurudeen13@gmail.com>",
    //   to,
    //   subject,
    //   react: body,
    // });
    // if (node_env === "production") {
    //   await resend.emails.send({
    //     from: "Usman <usmannurudeen13@gmail.com>",
    //     to,
    //     subject,
    //     react: body,
    //   });
    // } else {
    //   await transport.verify();
    //   transport.sendMail({
    //     to,
    //     subject,
    //     html: body,
    //     from: `PiPoint <pipointedu@gmail.com>`,
    //   });
    // }

    console.log("Client Secret:", process.env.EMAIL_CLIENT_SECRET);

    await transport.verify();
    transport.sendMail({
      to,
      subject,
      html: body,
      from: `Message <usmannurudeen13@gmail.com>`,
    });
  } catch (err) {
    throw new Error(`Error sending mail: ${err}`);
  }
}

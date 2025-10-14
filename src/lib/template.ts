import { render } from "@react-email/render";
// import MathEmail from "@/emails/MathEmail";
// import { ContactMessageEmail } from "@/emails/ContactMessageEmail";
// import { TutorRequestEmail } from "@/emails/TutorRequestEmail";
// import { ForgotPasswordEmail } from "@/emails/ForgotPasswordEmail";
import ContactMessageEmail from "@/components/emailTemplates/contactMessageEmail";

interface ContactUsProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type RenderTemplateParams = {
  type: "contactUs";
  id?: string;
  props: ContactUsProps;
};

// type Params = {
//   id?: string;
//   type: "math" | "review" | "contactUs" | "tutorRequest";
//   props: TemplateProps;
// };

export const renderTemplate = async ({ type, props }: RenderTemplateParams) => {
  switch (type) {
    // case "math":
    //   const { userName, question, comment, status } = props;
    //   return render(MathEmail({ userName, question, comment, status }));
    case "contactUs":
      const { name, email, subject, message } = props;
      return render(ContactMessageEmail({ name, email, subject, message }));
    // case "tutorRequest":
    //   const {
    //     parentName,
    //     phone,
    //     contactMethod,
    //     studentName,
    //     studentAge,
    //     schoolName,
    //     classLevel,
    //     curriculum,
    //     subjects,
    //     learningGoal,
    //     examTarget,
    //     preferredDays,
    //     preferredTime,
    //     sessionType,
    //     startDate,
    //     address,
    //     city,
    //     learningStyle,
    //     tutorGender,
    //     comments,
    //     referralSource,
    //   } = props;
    //   return render(
    //     TutorRequestEmail({
    //       parentName,
    //       phone,
    //       email: props.email,
    //       contactMethod,
    //       studentName,
    //       studentAge,
    //       schoolName,
    //       classLevel,
    //       curriculum,
    //       subjects,
    //       learningGoal,
    //       examTarget,
    //       preferredDays,
    //       preferredTime,
    //       sessionType,
    //       startDate,
    //       address,
    //       city,
    //       learningStyle,
    //       tutorGender,
    //       comments,
    //       referralSource,
    //     })
    //   );

    default:
      return "No template found";
  }
};

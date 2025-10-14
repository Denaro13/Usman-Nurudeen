import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
  Section,
} from "@react-email/components";
import React from "react";

interface ContactMessageEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactMessageEmail = ({
  name,
  email,
  subject,
  message,
}: ContactMessageEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>New Contact Message from {name}</Preview>
        <Body style={{ fontFamily: "Arial, sans-serif" }}>
          <Container className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <Text className="text-xl font-bold mb-2 text-gray-800">
              📩 New Contact Message
            </Text>

            <Section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <Text>
                <strong>Name:</strong> {name}
              </Text>
              <Text>
                <strong>Email:</strong> {email}
              </Text>
              {subject && (
                <Text>
                  <strong>Subject:</strong> {subject}
                </Text>
              )}

              <div className="bg-yellow-600 text-white p-3 rounded mt-4 whitespace-pre-wrap">
                <Text>{message}</Text>
              </div>
            </Section>

            <Text className="text-sm text-gray-600 mt-6">
              You received this message through the Contact Us form on your
              website.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactMessageEmail;

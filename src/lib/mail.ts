import { Resend } from "resend";
import PasswordResetEmail from "@/emails/passwordreset";
import { VerificationEmail } from "@/emails/verification";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_Website_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Email Verification Mail from LaunchSaaS",
    react: VerificationEmail({ verificationLink: confirmLink }),
  });
};

export const sendPasswordResetToken = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_Website_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Password Reset Mail from LaunchSaaS",
    react: PasswordResetEmail({ verificationLink: confirmLink }),
  });
};

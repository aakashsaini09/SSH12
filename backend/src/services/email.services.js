import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ({ to, token }) => {
  const verifyUrl = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;

  return resend.emails.send({
    from: "YourApp <onboarding@resend.dev>",
    to: [to],
    subject: "Verify your email",
    html: `
      <h2>Verify your email</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link expires in 1 hour.</p>
    `
  });
};

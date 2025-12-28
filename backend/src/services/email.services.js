import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aakashsaini948585@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
});

export const sendVerificationEmail = async ({ to, token }) => {
  try {
    // Check if BASE_URL is http://localhost:8000
    // and make sure to add /auth if your router uses it!
    const verifyUrl = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;

    // console.log("Generated Link:", verifyUrl);

    const mailOptions = {
      from: `"YourApp" <aakashsaini948585@gmail.com>`,
      to: to,
      subject: "Verify your email",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Verify your email</h2>
          <p>Click the link below to verify your account:</p>
          <a href="${verifyUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw error;
  }
};
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { firstName, lastName, email } = req.body;

    console.log("Received request:", { firstName, lastName, email });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "22ht1a05b9@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Transporter created successfully");

    const info = await transporter.sendMail({
      from: '"TechnoCrats Association" <22ht1a05b9@gmail.com>',
      to: email,
      subject: "Successfully Subscribed to TechnoCrats Association",
      text: `Dear ${firstName} ${lastName},\n\nThank you for subscribing to the TechnoCrats Association newsletter. We're excited to keep you updated on our latest innovations and initiatives.\n\nBest regards,\nTechnoCrats Association Team`,
      html: `<p>Dear ${firstName} ${lastName},</p><p>Thank you for subscribing to the TechnoCrats Association newsletter. We're excited to keep you updated on our latest innovations and initiatives.</p><p>Best regards,<br>TechnoCrats Association Team</p>`,
    });

    console.log("Email sent successfully:", info.response);
    return res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Detailed error:", error);
    return res.status(500).json({
      message: "Error processing subscription",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

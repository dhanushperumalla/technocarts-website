import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email } = await request.json();

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
    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        message: "Error processing subscription",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

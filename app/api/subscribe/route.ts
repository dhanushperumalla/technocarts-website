import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email } = await request.json();

    console.log("Received request:", { firstName, lastName, email });

    if (!process.env.EMAIL_PASS) {
      console.error("EMAIL_PASS environment variable is not set");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Store subscriber data in MongoDB
    const client = await clientPromise;
    const db = client.db("TechnoCrats"); // Use your database name here

    // Check if the collection exists, if not create it
    const collections = await db
      .listCollections({ name: "subscribers" })
      .toArray();
    if (collections.length === 0) {
      await db.createCollection("subscribers");
      console.log("Subscribers collection created");
    }

    const subscribersCollection = db.collection("subscribers");

    // Insert the new subscriber
    const result = await subscribersCollection.insertOne({
      firstName,
      lastName,
      email,
      subscriptionDate: new Date(),
    });

    console.log("Subscriber data stored in MongoDB:", result.insertedId);

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
      subject: "Successfully Subscribed to TechnoCrats Association 🎉",
      text: `Dear ${firstName} ${lastName},\n\nThank you for subscribing to the TechnoCrats Association newsletter. 🎉 We're excited to keep you updated on our latest innovations and initiatives. 💡🌐\n\nBest regards,\nTechnoCrats Association Team 🤝`,
      html: `<p>Dear ${firstName} ${lastName},</p><p>Thank you for subscribing to the TechnoCrats Association newsletter. 🎉 We're excited to keep you updated on our latest innovations and initiatives. 💡🌐</p><p>Best regards,<br>TechnoCrats Association Team 🤝</p>`,
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

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields (name, email, or message)." },
        { status: 400 }
      );
    }

    const recipient = "gebregebey@gmail.com";

    // Grab environment variables for SMTP configuration
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465");

    console.log(`[Contact API] Received message from ${name} (${email}):`, {
      subject: subject || "(No Subject)",
      message,
    });

    // Fallback simulation if environment variables are not configured yet
    if (!user || !pass) {
      console.log(
        "[Contact API] SMTP credentials (SMTP_USER/SMTP_PASS) are not configured. Logging details and simulating successful sending."
      );
      return NextResponse.json({
        success: true,
        message: "Message received successfully (Simulation mode - credentials missing).",
      });
    }

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // Use SSL for port 465
      auth: {
        user,
        pass,
      },
    });

    // Send email parameters
    await transporter.sendMail({
      from: `"${name}" <${user}>`, // Authenticated address is required by most SMTP relays
      replyTo: email,
      to: recipient,
      subject: `[Portfolio Contact Form] ${subject || "New Message"} - from ${name}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${
        subject || "N/A"
      }\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Message</h2>
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject || "N/A"}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 6px; border-left: 4px solid #06b6d4; white-space: pre-wrap;">
            <p style="margin: 0; font-weight: bold; padding-bottom: 5px;">Message:</p>
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("An unexpected error occurred.");
    console.error("[Contact API] Error:", err);
    return NextResponse.json(
      { message: err.message || "An internal error occurred while processing your message." },
      { status: 500 }
    );
  }
}

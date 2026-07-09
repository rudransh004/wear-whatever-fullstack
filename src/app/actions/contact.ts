"use server";
import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: FormData) {
  // 1. Extract data from the frontend form
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const orderId = formData.get("orderId") as string;
  const message = formData.get("message") as string;

  // 2. Configure the Mailtrap Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // 3. Dispatch the Email to the Sandbox
    await transporter.sendMail({
      from: `"WearWhatever System" <no-reply@wearwhatever.in>`, // The system sending it
      to: 'support.wearwhatever@gmail.com', // Your official support email
      replyTo: email, // If you hit reply, it goes to the customer
      subject: `[${subject.toUpperCase()}] New Inquiry from ${name}`,
      text: `
      WEAR WHATEVER - AUTOMATED CONTACT DISPATCH
      ------------------------------------------
      CUSTOMER NAME: ${name}
      CUSTOMER EMAIL: ${email}
      INQUIRY TYPE: ${subject}
      ORDER ID: ${orderId || 'NOT PROVIDED'}
      
      MESSAGE LOG:
      ${message}
      ------------------------------------------
      End of transmission.
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error("Mailtrap Dispatch Failed:", error);
    return { success: false, error: "System failure. Could not transmit signal." };
  }
}
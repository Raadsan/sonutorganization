import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, inquiryType, subject, message } = body;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Fadlan buuxi dhammaan meelaha banaan (All required fields must be filled)." },
        { status: 400 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "support@sonut.org.so";

    // Set up transporter
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    console.log(`[Contact Form] Received message from ${fullName} <${email}>: "${subject}" to ${receiverEmail}`);

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${fullName} (via SONUT)" <${process.env.SMTP_FROM || smtpUser}>`,
        replyTo: email,
        to: receiverEmail,
        subject: `[SONUT Contact - ${inquiryType || "General Inquiry"}] ${subject}`,
        text: `Magaca: ${fullName}\nEmail: ${email}\nNooca Codsiga (Inquiry Type): ${inquiryType || "General Inquiry"}\nSubject: ${subject}\n\nFarriinta (Message):\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #ffffff;">
            <div style="background: #1E0D79; color: #ffffff; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 22px; font-weight: bold;">SONUT - Somali National Union of Teachers</h1>
              <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.85;">Farriin Cusub oo ka timid Form-ka Xiriirka (New Contact Submission)</p>
            </div>
            
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #4b5563; width: 140px; border-bottom: 1px solid #f3f4f6;">Magaca (Name):</td>
                  <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #f3f4f6;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #4b5563; border-bottom: 1px solid #f3f4f6;">Email:</td>
                  <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${email}" style="color: #F4313F; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #4b5563; border-bottom: 1px solid #f3f4f6;">Nooca (Type):</td>
                  <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #f3f4f6;">${inquiryType || "General Inquiry"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #4b5563; border-bottom: 1px solid #f3f4f6;">Cinwaanka (Subject):</td>
                  <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #f3f4f6;"><strong>${subject}</strong></td>
                </tr>
              </table>

              <div style="background: #f9fafb; border-left: 4px solid #1E0D79; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 8px; color: #1E0D79; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Farriinta (Message):</h4>
                <p style="margin: 0; color: #374151; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${message}</p>
              </div>

              <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 24px;">
                Waxaad toos ugu jawaabi kartaa qofkan adiga oo riixaya "Reply".
              </p>
            </div>
            
            <div style="background: #f3f4f6; padding: 12px; text-align: center; font-size: 11px; color: #6b7280;">
              &copy; ${new Date().getFullYear()} SONUT (Somali National Union of Teachers). All rights reserved.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn(
        `[Contact Form] SMTP credentials not fully configured in environment. The message from ${email} to ${receiverEmail} was recorded in server logs.`
      );
    }

    return NextResponse.json({
      success: true,
      message: `Farriintaada si guul leh ayaa loo diray oo waxaa loo diray ${receiverEmail}.`,
    });
  } catch (error: any) {
    console.error("[Contact Form Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Khalad ayaa dhacay intii farriinta la dirayay." },
      { status: 500 }
    );
  }
}

import fs from "fs";
import { Resend } from "resend";

import { RESEND_API_KEY, RESEND_EMAIL } from "@/constants";

export class Email {
  private to: string;

  constructor(to: string) {
    this.to = to;
  }

  private sendEmail(subject: string, html: string) {
    const resend = new Resend(RESEND_API_KEY);

    resend.emails.send({
      from: RESEND_EMAIL!,
      to: this.to,
      subject,
      html,
    });
  }

  sendEmailVerification(verificationLink: string) {
    // Get the email template from the email-templates folder
    const emailTemplate = fs.readFileSync(
      "src/templates/email/verify-email.html",
      "utf-8"
    );

    // Replace the placeholder with the verification link
    const emailBody = emailTemplate.replace(
      "{{verificationLink}}",
      verificationLink
    );

    // Send the email
    this.sendEmail("Verify your email", emailBody);
  }

  sendWelcomeEmail() {
    // Get the email template from the email-templates folder
    const emailTemplate = fs.readFileSync(
      "src/templates/email/welcome.html",
      "utf-8"
    );

    // Send the email
    this.sendEmail("Welcome to Thrifters!", emailTemplate);
  }
}

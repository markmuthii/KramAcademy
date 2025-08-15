import fs from "fs";
import { Resend } from "resend";

import { APP_NAME, RESEND_API_KEY, RESEND_EMAIL } from "@/constants";

export class Email {
  private to: string;

  constructor(to: string) {
    this.to = to;
  }

  private async sendEmail(subject: string, html: string) {
    // Replace {{APP_NAME}} with the actual app name in the html content
    html = html.replace(/{{APP_NAME}}/g, APP_NAME);

    const resend = new Resend(RESEND_API_KEY);

    const emailResponse = await resend.emails.send({
      from: RESEND_EMAIL!,
      to: this.to,
      subject,
      html,
    });

    return emailResponse;
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
    return this.sendEmail("Verify your email", emailBody);
  }

  sendWelcomeEmail() {
    // Get the email template from the email-templates folder
    const emailTemplate = fs.readFileSync(
      "src/templates/email/welcome.html",
      "utf-8"
    );

    // Send the email
    return this.sendEmail(`Welcome to ${APP_NAME}!`, emailTemplate);
  }

  sendResetPasswordEmail(resetLink: string) {
    // Get the email template from the email-templates folder
    const emailTemplate = fs.readFileSync(
      "src/templates/email/reset-password.html",
      "utf-8"
    );

    // Replace the placeholder with the reset link
    const emailBody = emailTemplate.replace("{{resetLink}}", resetLink);

    // Send the email
    return this.sendEmail("Reset your password", emailBody);
  }

  sendPasswordChangedEmail() {
    // Get the email template from the email-templates folder
    const emailTemplate = fs.readFileSync(
      "src/templates/email/password-reset.html",
      "utf-8"
    );

    // Send the email
    return this.sendEmail("Password Reset Successful", emailTemplate);
  }
}

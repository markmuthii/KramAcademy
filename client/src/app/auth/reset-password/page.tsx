import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: `Reset Password - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Reset your password on ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

const ResetPassword = () => {
  return <ResetPasswordForm />;
};

export default ResetPassword;

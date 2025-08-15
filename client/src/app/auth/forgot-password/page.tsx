import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = {
  title: `Forgot Password - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Reset your password",
};

const ForgotPassword = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPassword;

import { VerifyEmail } from "@/components/auth/verify-email";

export const metadata = {
  title: `Verify Email - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Verify your email address to complete the registration process.",
};

const VerifyEmailPage = () => {
  return <VerifyEmail />;
};

export default VerifyEmailPage;

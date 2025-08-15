import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: `Login - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Login to your ${process.env.NEXT_PUBLIC_APP_NAME} account`,
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

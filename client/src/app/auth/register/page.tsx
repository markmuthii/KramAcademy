import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: `Register - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Create an account on ${process.env.NEXT_PUBLIC_APP_NAME} today and start your journey towards a more sustainable lifestyle.`,
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/schemas/forms";
import { LoginFormData, User } from "@/types";
import { startTransition, useActionState, useEffect } from "react";
import { login } from "@/services/auth";
import { useAuth } from "@/store/auth";

const LoginForm = () => {
  const [state, loginAction, pending] = useActionState(login, null);
  const { setUser, authError, clearAuthError } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormData) {
    startTransition(() => {
      loginAction(values);
    });
  }

  useEffect(() => {
    if (state === null) return;

    if ("message" in state && "user" in state) {
      setUser(state.user as User);
      toast.success(state.message, { duration: 8000 });
      redirect("/account");
    }

    if ("error" in state) {
      toast.error(state.error);
    }
  }, [state]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      clearAuthError();
    }
  }, []);

  return (
    <div className="container mx-auto max-w-xl p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Log in to access your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@wick.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: Get this working  */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 ">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link href="/auth/forgot-password" className="text-sm text-primary">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "..." : "Log In"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export { LoginForm };

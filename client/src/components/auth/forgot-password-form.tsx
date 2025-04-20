"use client";

import { startTransition, useActionState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { forgotPasswordSchema } from "@/schemas/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ForgotPasswordFormData } from "@/types";
import { forgotPassword } from "@/services/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const ForgotPasswordForm = () => {
  const [state, forgotPasswordAction, pending] = useActionState(
    forgotPassword,
    null
  );

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormData) => {
    startTransition(() => {
      forgotPasswordAction(values);
    });
  };

  useEffect(() => {
    if (state === null) return;

    if ("message" in state) {
      toast.success(state.message, { duration: 8000 });
      redirect("/auth/login");
    }

    if ("error" in state) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="container max-w-xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Forgot Your Password?</h1>
        <p className="text-muted-foreground">
          No worries! Just enter your email address below.
        </p>
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
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link href="/auth/login" className="text-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export { ForgotPasswordForm };

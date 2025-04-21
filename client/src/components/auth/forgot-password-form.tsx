"use client";

import { startTransition, useActionState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";

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
    <AuthFormWrapper form="forgot-password">
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
    </AuthFormWrapper>
  );
};

export { ForgotPasswordForm };

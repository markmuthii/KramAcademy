"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

const SubmitButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button className={className} type="submit" disabled={pending}>
      {children}
    </Button>
  );
};

export { SubmitButton };

"use client";

import { useAuth } from "@/store/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const AccountNav = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <h1>Welcome, {user?.firstName}</h1>

      <button
        type="button"
        onClick={async () => {
          const res = await logout();

          if ("error" in res) {
            toast.error(res.error);
          } else if ("message" in res) {
            // Redirect to login page after logout
            toast.success(res.message);

            redirect("/auth/login");
          }
        }}
      >
        Logout
      </button>
    </>
  );
};

export { AccountNav };

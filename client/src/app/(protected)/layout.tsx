"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/store/auth";
import { getUserSession } from "@/lib/session";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, setAuthError } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only send request if user is not already set
    // This prevents unnecessary requests when navigating between pages
    if (!user) {
      const getUser = async () => {
        // setLoading(true);
        const session = await getUserSession();
        if ("error" in session) {
          setAuthError("You must be logged in to access this page.");
          // setLoading(false);
          redirect("/auth/login");
        } else if (session.user) {
          // Set user in store
          setUser(session.user);
          setLoading(false);
        }
      };
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedLayout;

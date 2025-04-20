import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

const AccountPage = async () => {
  const session = await getUserSession();

  if ("error" in session) {
    redirect("/auth/login");
  }

  return <div>AccountPage</div>;
};

export default AccountPage;

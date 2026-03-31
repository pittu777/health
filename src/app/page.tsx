
import LogoutButton from "@/feature/auth/Logout";
import SessionRefresh from "@/feature/auth/SessionRefresh";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user, shouldRefreshTokens } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <SessionRefresh enabled={shouldRefreshTokens} />
      <p>hello welcome to home</p>
      <p>{user?.name}</p>
      <LogoutButton />
    </>
  )
}

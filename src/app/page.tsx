
import LogoutButton from "@/feature/auth/Logout";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";





export default async function Page() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const user = await getCurrentUser();

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <p>hello welcome to home</p>
      <p>{user?.name}</p>
      <LogoutButton />
    </>
  )
}

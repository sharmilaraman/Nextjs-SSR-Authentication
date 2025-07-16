import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div>
     
    </div>
  );
}

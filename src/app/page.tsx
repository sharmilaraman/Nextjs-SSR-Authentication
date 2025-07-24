import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
export default async function HomePage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log(allCookies);
  const token = cookieStore.get("token")?.value;
if (!token) {
    redirect("/login");
  }
 return (
    <div>
      
    </div>
  );
}

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
export default async function HomePage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log(allCookies);
  const token = cookieStore.get("token")?.value;
  console.log(token);
if (!token) {
    redirect("/login");
  }
 return (
    <div>
      Welcome to my Next js App using SSR Authentication
      <Image alt="Banner" src="/images/Banner.png" width={100} height={300} />
    </div>
  );
}

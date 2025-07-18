import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function HomePage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  // allCookies is an array of { name, value } objects
  console.log(allCookies);

  // Example: get a specific cookie
  const token = cookieStore.get("token")?.value;

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

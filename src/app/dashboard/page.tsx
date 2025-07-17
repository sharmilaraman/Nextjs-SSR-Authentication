
import LogoutButton from "../login/LogoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";

type DashboardStats = {
  learner_count: number;
  course_count: number;
  facilitator_count: number;
};

async function getDashboardStats(): Promise<DashboardStats> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(
    "https://api2-tejasvita-elearning.underdev.in/api/dashboard/admin-dashboard",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  console.log("Dashboard API data:", data);

  if (!data.status) {
    redirect("/login");
  }
  return data.data as DashboardStats; // 2. Use the type here
}

// 3. Use the type in cardData
const cardData = (stats: DashboardStats) => [
  {
    title: "Learners",
    value: stats.learner_count,
    color: "blue",
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-2a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm6-2a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
        />
      </svg>
    ),
    bg: "bg-blue-100",
  },
  {
    title: "Courses",
    value: stats.course_count,
    color: "green",
    icon: (
      <BookOpen className="w-8 h-8 text-green-500" />
    ),
    bg: "bg-green-100",
  },
  {
    title: "Facilitators",
    value: stats.facilitator_count,
    color: "orange",
    icon: (
      <svg
        className="w-8 h-8 text-orange-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
      </svg>
    ),
    bg: "bg-orange-100",
  },
  {
    title: "Courses",
    value: stats.course_count,
    color: "green",
    icon: (
      <BookOpen className="w-8 h-8 text-green-500" />
    ),
    bg: "bg-green-100",
  },
  
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const name = cookieStore.get("name")?.value; 
  const stats = await getDashboardStats(); 
  console.log("Token used:", stats.learner_count);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-sm md:text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              {name && (
                <span className="text-black text-sm md:text-xl font-semibold">Admin: {name}</span>
              )}
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cardData(stats).map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
            >
              <div className={`${card.bg} p-3 rounded-full`}>{card.icon}</div>
              <div>
                <div className="text-gray-500">{card.title}</div>
                <div className="text-2xl font-bold">{card.value}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

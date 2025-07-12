import { requireAuth, logoutUser } from '../actions/auth';
import LogoutButton from '../login/LogoutButton';

async function getDashboardStats() {
  const [productsRes, usersRes, cartsRes, categoriesRes] = await Promise.all([
    fetch('https://fakestoreapi.com/products'),
    fetch('https://fakestoreapi.com/users'),
    fetch('https://fakestoreapi.com/carts'),
    fetch('https://fakestoreapi.com/products/categories'),
  ]);
  const [products, users, carts, categories] = await Promise.all([
    productsRes.json(),
    usersRes.json(),
    cartsRes.json(),
    categoriesRes.json(),
  ]);
  return {
    products: products.length,
    users: users.length,
    carts: carts.length,
    categories: categories.length,
  };
}

const cardData = (stats: any) => [
  {
    title: 'Products',
    value: stats.products,
    color: 'blue',
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
    ),
    bg: 'bg-blue-100',
  },
  {
    title: 'Customers',
    value: stats.users,
    color: 'green',
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-2a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm6-2a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" /></svg>
    ),
    bg: 'bg-green-100',
  },
  {
    title: 'Orders',
    value: stats.carts,
    color: 'orange',
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
    ),
    bg: 'bg-orange-100',
  },
  {
    title: 'Product Categories',
    value: stats.categories,
    color: 'purple',
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
    bg: 'bg-purple-100',
  },
];

export default async function DashboardPage() {
  const user = await requireAuth();
  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cardData(stats).map((card) => (
            <div key={card.title} className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
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

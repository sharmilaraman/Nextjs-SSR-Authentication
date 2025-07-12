import { getCurrentUser } from './actions/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}

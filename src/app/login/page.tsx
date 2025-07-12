
import { getCurrentUser, handleLoginAction } from '../actions/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // Check if user is already logged in
  const user = await getCurrentUser();
  if (user) {
    redirect('/dashboard');
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
           Welcome
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={handleLoginAction}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="appearance-none relative block w-full h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md "
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="appearance-none relative block w-full h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md pr-10"
              />
              
            </div>
          </div>

          {searchParams.error === 'invalid_credentials' && (
            <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md py-2 px-3">
              Invalid email or password. Please try again.
            </div>
          )}

          <div className='text-center'>
            <button
              type="submit"
              className="group relative w-[100px] py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-yellow-600 "
            >
              Login
            </button>
            <div  className="text-sm mt-4 text-gray-600">
              <p>Dont't have an account ? <span className='hover:underline text-yellow-600'>Sign in</span></p>
            </div>
          </div>
        </form>
        
        
      </div>
    </div>
  );
}
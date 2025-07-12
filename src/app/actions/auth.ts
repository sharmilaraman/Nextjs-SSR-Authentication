'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Mock user data - in a real app, you'd use a database
const MOCK_USERS = [
  { id: '1', email: 'user@gmail.com', password: 'password123', name: 'Test User' },
  {id:'2',email:'admin@gmail.com',password:'password321',name:'Admin'}
];

export interface User {
  id: string;
  email: string;
  name?: string;
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Find user
    const user = MOCK_USERS.find(u =>u.id && u.email === email && u.password === password );

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Create JWT-like token (in a real app, use proper JWT)
    const token = `jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, 
    });

    // Store user data in a separate cookie for SSR access
    const userData = { id: user.id, email: user.email, name: user.name };
    cookieStore.set('user_data', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    // Clear cookies
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    cookieStore.delete('user_data');
    
    revalidatePath('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const userData = cookieStore.get('user_data');

    if (!token || !userData) {
      return null;
    }

    if (!userData || !userData.value) {
      return null;
    }
    return JSON.parse(userData.value);
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return user;
}

// Server action for handling login form submission
export async function handleLoginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = await loginUser(email, password);

  if (result.success) {
    redirect('/dashboard');
  } else {
    // In a real app, you'd handle this error more gracefully
    // For now, we'll redirect back with an error
    redirect('/login?error=invalid_credentials');
  }
} 
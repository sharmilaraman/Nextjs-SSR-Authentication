import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user data - in a real app, you'd use a database
const MOCK_USERS = [
  { id: '1', email: 'user@gmail.com', password: 'password123', name: 'Test User' }
];

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token');

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In a real app, you'd validate the session token against your database
    // For now, we'll just return the first user if a session token exists
    const user = MOCK_USERS[0];
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
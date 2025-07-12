import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user data - in a real app, you'd use a database
const MOCK_USERS = [
  { id: '1', email: 'user@example.com', password: 'password123', name: 'Test User' }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session (in a real app, you'd use JWT or session tokens)
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If a valid session already exists, go straight to the dashboard.
  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session', { cache: 'no-store' });
        const result = await response.json();
        if (!cancelled && result?.authenticated) {
          const from = searchParams.get('from');
          router.replace(from && from.startsWith('/') ? from : '/');
          router.refresh();
        }
      } catch (err) {
        // Stay on the login screen if the check fails.
      }
    };

    checkSession();
    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const from = searchParams.get('from');
        router.replace(from && from.startsWith('/') ? from : '/');
        router.refresh();
      } else {
        setError(result.error || 'Invalid password');
        setLoading(false);
      }
    } catch (err) {
      setError('Unable to sign in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8l-4-4l-6 6" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg">Gokul Dashboard</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 shadow-xl"
        >
          <h1 className="text-white text-lg font-semibold mb-1">Enter access password</h1>
          <p className="text-gray-400 text-sm mb-5">
            This dashboard is private. Enter the password to continue.
          </p>

          <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />

          {error && (
            <p className="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-5 w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            {loading ? 'Signing in...' : 'Unlock Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

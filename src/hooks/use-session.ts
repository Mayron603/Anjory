
"use client";

import { useState, useEffect, useCallback } from 'react';

interface Session {
  userId: string;
  name: string;
  email: string;
  picture?: string;
  phone?: string | null;
  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  expires: string;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/session');
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();

    // Re-fetch session on window focus or when tab becomes visible
    // to keep session in sync across tabs and after long periods of inactivity
    window.addEventListener('focus', fetchSession);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            fetchSession();
        }
    });

    return () => {
        window.removeEventListener('focus', fetchSession);
        document.removeEventListener('visibilitychange', fetchSession);
    };
  }, [fetchSession]);

  return { session, isLoading, mutate: fetchSession };
}

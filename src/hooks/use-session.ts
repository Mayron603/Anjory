
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
      const res = await fetch('/api/session', { cache: 'no-store' });
      
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      } else {
        // This is an expected case when the user is not logged in.
        setSession(null);
      }
    } catch (error) {
      // Log only unexpected network errors, not 401 responses.
      console.error('Failed to fetch session:', error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSession();
      }
    };

    window.addEventListener('focus', fetchSession);
    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
        window.removeEventListener('focus', fetchSession);
        window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchSession]);

  return { session, isLoading, mutate: fetchSession };
}

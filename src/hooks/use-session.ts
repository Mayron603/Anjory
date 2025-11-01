
"use client";

import { useState, useEffect } from 'react';

interface User {
  userId: string;
  name: string;
  email: string;
  picture?: string;
}

interface Session {
  userId: string;
  name: string;
  email: string;
  picture?: string;
  expires: string;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
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
    };

    fetchSession();
  }, []);

  return { session, isLoading };
}
    

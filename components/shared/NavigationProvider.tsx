'use client';
 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setRouter } from '@/lib/router';
 
export default function NavigationProvider() {
  const router = useRouter();
 
  useEffect(() => {
    setRouter(router);
  }, [router]);
 
  return null;
}
 

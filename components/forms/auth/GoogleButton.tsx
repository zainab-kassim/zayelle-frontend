'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInWithGoogle } from '@/services/auth.service';

// Google Identity Services attaches itself to window.google once the
// gsi/client script loads; it ships no types.
declare global {
  interface Window {
    google?: any;
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleButton() {
  const router = useRouter();
  const tokenClient = useRef<any>(null);

  // built once, silently, as soon as the gsi/client script is available
  const initClient = () => {
    if (tokenClient.current || !window.google) return;
    if (!CLIENT_ID) {
      console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
      return;
    }

    tokenClient.current = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: 'openid email profile',
      callback: async (response: { access_token?: string; error?: string }) => {
        // Google runs this when the popup finishes
        if (!response.access_token) {
          toast.error('Google sign-in was cancelled.');
          return;
        }
        try {
          const res = await signInWithGoogle(response.access_token);
          localStorage.setItem('fullName', res.user.fullName);
          localStorage.setItem('email', res.user.email);
          toast.success(`Welcome, ${res.user.fullName}!`);
          router.push('/');
        } catch {
          toast.error('Google sign-in failed. Please try again.');
        }
      },
    });
  };

  // covers the case where the script was already cached and onLoad won't fire
  useEffect(() => {
    initClient();
  }, []);

  const handleClick = () => {
    if (!tokenClient.current) {
      toast.error('Google sign-in is still loading. Try again in a moment.');
      return;
    }
    tokenClient.current.requestAccessToken(); // opens the Google popup
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initClient}
      />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-3 border border-[#E0E0E0] rounded-[8px] py-3.5 px-6 bg-white text-[15px] md:text-[16px] font-medium text-[#1a1a1a] transition-colors duration-150 hover:bg-[#EFEFEF] active:bg-[#E5E5E5] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.34A9 9 0 0 0 9 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.98 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.02-2.34z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.02 2.34C4.68 5.16 6.66 3.58 9 3.58z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </>
  );
}

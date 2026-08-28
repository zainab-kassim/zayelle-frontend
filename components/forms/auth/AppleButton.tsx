'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInWithApple } from '@/services/auth.service';

// Apple's JS SDK attaches itself to window.AppleID once appleid.auth.js loads;
// it ships no types.
declare global {
  interface Window {
    AppleID?: any;
  }
}

const SERVICES_ID = process.env.NEXT_PUBLIC_APPLE_SERVICES_ID;

// errors AppleID.auth.signIn() rejects with when the user just backs out
const CANCEL_ERRORS = [
  'popup_closed_by_user',
  'user_cancelled_authorize',
  'user_trigger_new_signin_flow',
];

export default function AppleButton() {
  const router = useRouter();
  const initialized = useRef(false);
  const [loading, setLoading] = useState(false);

  const initApple = () => {
    if (initialized.current || !window.AppleID) return;
    if (!SERVICES_ID) {
      console.error('NEXT_PUBLIC_APPLE_SERVICES_ID is not set');
      return;
    }

    window.AppleID.auth.init({
      clientId: SERVICES_ID,
      scope: 'name email',
      redirectURI: window.location.origin, // must be a registered Return URL
      usePopup: true,
    });
    initialized.current = true;
  };

  // covers the case where the script was already cached and onLoad won't fire
  useEffect(() => {
    initApple();
  }, []);

  const handleClick = async () => {
    if (!window.AppleID || !initialized.current) {
      toast.error('Apple sign-in is still loading. Try again in a moment.');
      return;
    }
    setLoading(true);
    try {
      const res = await window.AppleID.auth.signIn();

      // Apple sends the name only on the very first sign-in
      const name = res.user?.name
        ? `${res.user.name.firstName ?? ''} ${res.user.name.lastName ?? ''}`.trim()
        : undefined;

      const data = await signInWithApple(
        res.authorization.id_token,
        name || undefined,
      );
      localStorage.setItem('fullName', data.user.fullName);
      localStorage.setItem('email', data.user.email);
      toast.success(`Welcome, ${data.user.fullName}!`);
      router.push('/');
    } catch (err: any) {
      setLoading(false);
      if (!CANCEL_ERRORS.includes(err?.error)) {
        toast.error('Apple sign-in failed. Please try again.');
      }
    }
  };

  return (
    <>
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        strategy="afterInteractive"
        onLoad={initApple}
      />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="inline-flex items-center justify-center gap-3 rounded-[8px] py-3.5 px-6 bg-black text-[15px] md:text-[16px] font-medium text-white transition-colors duration-150 hover:bg-[#1d1d1f] active:bg-[#2a2a2c] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            // bordered spinner, white so it reads on the black button
            <span className="block w-[18px] h-[18px] rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <svg
                width="14"
                height="17"
                viewBox="0 0 384 512"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C64.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Continue with Apple
            </>
          )}
        </button>
      </div>
    </>
  );
}

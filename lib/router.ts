import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
 
let router: AppRouterInstance | null = null;
 
export const setRouter = (r: AppRouterInstance) => {
  router = r;
};
 
export const getRouter = () => router;
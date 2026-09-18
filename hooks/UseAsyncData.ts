import { useEffect, useState } from 'react';

// Shared fetch/isLoading/error pattern for list-fetching components.
// Skip this if you need to branch on a specific error type.
export function useAsyncData<T>(
    fetcher: () => Promise<T>,
    deps: unknown[],
    fallback: T
) {
    const [data, setData] = useState<T>(fallback);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        setError(null);

        fetcher()
            .then((result) => {
                if (!cancelled) setData(result);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err);
                    // clear stale data so a failed fetch doesn't leave old results on screen
                    setData(fallback);
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, isLoading, error };
}

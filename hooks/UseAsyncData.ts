import { useEffect, useState } from 'react';

// Centralizes the repeated "fetch on mount/dep-change, track isLoading,
// swallow-or-log the error" pattern used by list-fetching components.
// Not meant for calls that need to branch on a specific error (status code,
// error type, etc.) — those should keep their own try/catch.
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
                if (!cancelled) setError(err);
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

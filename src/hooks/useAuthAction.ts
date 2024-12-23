import { useState, useCallback } from 'react';

type AsyncCallback<T, P> = (params: P) => Promise<T>;

interface UseAuthActionResult<T, P> {
    execute: (params: P) => Promise<T | undefined>;
    isLoading: boolean;
    error: string | null;
    clearError: () => void;
}

export function useAuthAction<T, P>(callback: AsyncCallback<T, P>): UseAuthActionResult<T, P> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const execute = useCallback(async (params: P) => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await callback(params);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [callback]);

    return {
        execute,
        isLoading,
        error,
        clearError
    };
}

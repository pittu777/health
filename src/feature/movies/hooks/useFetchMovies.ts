"use client";

import apiClient from '@/api/Api';
import React, { useEffect, useState } from 'react'



const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(url);
                setData(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
                else setError('An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, loading, error }
}

export default useFetch;
"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useCallback, useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react'
import useFetch from './hooks/useFetchMovies'
import Movies from './Movies';

const Search = () => {

    const { data, loading, error } = useFetch("https://imdb236.p.rapidapi.com/api/imdb/cast/nm0000190/titles");
    const [search, setSearch] = useState("");
    const deferredSearch = useDeferredValue(search);
    const isPending = search !== deferredSearch;



    const filteredMovies = useMemo(() => {
        if (!deferredSearch) return data;

        return data?.filter((movie: any) =>
            movie.primaryTitle?.toLowerCase().includes(deferredSearch.toLowerCase())
        );
    }, [deferredSearch, data]);

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value);

    }, [])


    if (loading) return <div className="flex h-screen items-center justify-center bg-[#0f1014]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
    if (error) return <div className="flex h-screen items-center justify-center bg-[#0f1014] text-red-400">{error}</div>;

    return (
        <div className='mt-2'>
            <div className='flex flex-row gap-2 max-w-xl mx-auto mb-8'>
                <Input
                    placeholder='Search Movie...'
                    value={search}
                    onChange={handleSearch}
                    className="bg-gray-900 border-gray-700 text-white"
                />

            </div>

            {/* 3. Pass the calculated filteredMovies to the grid */}
            <div className={isPending ? "opacity-60 transition-opacity" : "opacity-100"}>
                <Movies movieData={filteredMovies} />
            </div>
        </div>
    )
}

export default Search

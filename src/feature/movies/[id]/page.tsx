// feature/movies/[id]/page.tsx
"use client";
import React from 'react';

import Link from 'next/link';
import useFetch from '../hooks/useFetchMovies';

const MovieDetailFeature = ({ params }: { params: { id: string } }) => {
    // console.log("iam moviedetail")
    // Now id will not be undefined

    const { id } = params;

    const { data, loading, error } = useFetch(`https://imdb236.p.rapidapi.com/api/imdb/${id}`);


    if (loading) return <div className="flex h-screen items-center justify-center bg-[#0f1014]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
    if (error) return <div className="flex h-screen items-center justify-center bg-[#0f1014] text-red-400">{error}</div>;

    return (
        <div className="min-h-screen bg-[#0f1014] text-white p-10">
            <Link href="/movies">← Back to List</Link>

            <div className="flex flex-col items-center mt-10">
                <img
                    src={data?.primaryImage}
                    className="w-64 rounded-xl"
                />
                <h1 className="text-4xl font-bold mt-6">
                    {data?.primaryTitle}
                </h1>
                <p className="text-yellow-400 mt-2">
                    ★ {data?.averageRating}
                </p>
                <button className="mt-6 bg-blue-500 px-6 py-2 rounded-lg">
                    Add to Favourites
                </button>
            </div>
        </div>
    );
};

export default MovieDetailFeature;

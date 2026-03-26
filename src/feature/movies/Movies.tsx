"use client";
import React from 'react';
import Link from 'next/link';

interface MovieCardTypes {
    id: string;
    image: string;
    title?: string;
    rating?: number;
}


const MovieCard = ({ id, image, title, rating }: MovieCardTypes) => {
    return (
        <div className="group relative flex flex-col bg-[#1a1c29] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 cursor-pointer">
            {/* Image Container with Aspect Ratio */}
            <div className="aspect-[2/3] w-full overflow-hidden bg-gray-900">
                <img
                    src={image || 'https://via.placeholder.com'}
                    alt={title || "Movie Poster"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Rating Badge */}
                {rating && (
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                        ★ {rating}
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="p-3">
                <h3 className="text-gray-100 font-medium text-sm leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {title || "Untitled Movie"}
                </h3>
                <p className="text-[10px] font-mono text-gray-500 mt-2 tracking-tighter">
                    ID: {id.slice(-8)}
                </p>
            </div>
        </div>
    );
};


const Movies = ({ movieData }) => {

    console.log("iam movies component")

    return (
        <div className="min-h-screen bg-[#0f1014] text-white p-6 md:p-10 mt-10">
            {/* Header Area */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Cast Collection</h1>
                    <p className="text-gray-400 text-sm mt-1">Showing all titles for the selected cast member</p>
                </div>
                <div className="bg-blue-600/10 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-600/20">
                    {movieData?.length || 0} Titles
                </div>
            </div>

            {/* The Grid - This is what makes it look good */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {movieData && movieData.map((movie: any) => (
                    <Link href={`/movies/${movie.id}`} key={movie.id}>
                        <MovieCard
                            id={movie.id}
                            image={movie?.primaryImage}
                            title={movie?.primaryTitle}
                            rating={movie?.averageRating}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Movies);

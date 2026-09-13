import React from 'react'
import { useRef } from 'react'

const SkeletonMovieCard = () => (
    <div className="min-w-[140px] w-[140px]">
        <div className="w-full h-40 bg-gray-700 rounded animate-pulse" />
        <div className="h-3 bg-gray-700 rounded mt-2 w-3/4 animate-pulse" />
    </div>
)

const MovieCard = ({movie}) => (
    <div className="min-w-[140px] w-[140px]">
        <img
            src={movie?.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='}
            alt={movie?.title || 'poster'}
            className="w-full h-40 object-cover rounded"
        />
        <div className="text-sm text-gray-200 mt-2">{movie?.title }</div>
    </div>
)

const Trending = ({movies = [] , isLoading} ) => {
    const scrollContainer = useRef(null)
function Scroll(direction) {
    if (!scrollContainer.current) return
    const offset = scrollContainer.current.clientWidth
    const delta = direction === 'left' ? -offset : offset
    scrollContainer.current.scrollBy({ left: delta, behavior: 'smooth' })
}

  return (
   <div className="py-6 px-12 relative">
            <h2 className="text-white text-xl font-bold mb-4 tracking-wider uppercase">
                TRENDING NOW
            </h2>

            <div className="group relative">
                <button
                onClick={ ()=>{Scroll('left')} }
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block -ml-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>

                <div
                ref={scrollContainer}

                    className="flex space-x-4  overflow-x-auto scrollbar-hide snap-x scroll-smooth pb-4">

                    {
                        isLoading ?
                            Array.from({ length: 14 }, (_, index) => <SkeletonMovieCard key={index} />) :
                            movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                    }
                </div>

                <button
                                onClick={()=>{Scroll('right')} }
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block -mr-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>

        </div>
  )
}

export default Trending
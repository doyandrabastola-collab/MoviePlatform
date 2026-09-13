
import React, { useEffect, useState } from 'react'
import Hero from '../Hero'
import Trending from './Trending'
import { movieApi } from './api'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTrendingMovies = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await movieApi.get('/trending/movie/week')

      setTrendingMovies(response.data.results)
    } catch (err) {
      console.error('Error fetching trending movies:', err)
      setError(err.message || 'Failed to fetch trending movies')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

  return (
    <div className="h-full overflow-visible">
      {error && (
        <div className="p-4 bg-red-50 text-red-700">
          <p className="mb-2">
            Failed to load movies: {error}
          </p>

          <button
            onClick={fetchTrendingMovies}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      <Hero
        movie={trendingMovies[0]}
        isLoading={isLoading}
      />

      <Trending
        movies={trendingMovies}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Home


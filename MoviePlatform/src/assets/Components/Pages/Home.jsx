import React from 'react'
import Hero from '../Hero'
import Trending from './Trending'
import { useState , useEffect } from 'react'
import { movieApi } from './api'

const Home = () => {
 const [TrendingMovies, setTrendingMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchTrendingMovies() {
            try {
                setIsLoading(true)
                const response = await movieApi.get('/trending/movie/week')
                setTrendingMovies(response.data.results)
                console.log(response);
                
            } catch (err) {
                console.log(err.message)
            }
            finally {
              
                setTimeout(() => setIsLoading(false), 1000  )
            }

        }

        fetchTrendingMovies()

    }, [])

  return (
    <div>
        <div className="h-full overflow-visible">
            <Hero movie={TrendingMovies[0]} isLoading={isLoading} />
            <Trending movies={TrendingMovies} isLoading={isLoading} />
        </div>

    </div>
  )
}

export default Home
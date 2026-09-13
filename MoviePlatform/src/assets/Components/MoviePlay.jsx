import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { movieApi } from "./Pages/api"

export function MoviePlay() {
    const { id } = useParams()
    const [videoKey, setVideoKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movieVideo, setMovieVideo] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchMovieDetails() {
            if (!id || id === ':id' || isNaN(Number(id))) {
                setIsLoading(false)
                return
            }

            try {
                const response = await movieApi.get(`/movie/${id}/videos`)
                setMovieVideo(response.data)
                console.log(response.data)
                const video = response.data.results?.find((vid) =>
                    vid.site?.toLowerCase() === 'youtube' && vid.type?.toLowerCase() === 'trailer'
                ) || response.data.results?.[0]

                if (video) setVideoKey(video.key)

            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovieDetails()
    }, [id])


    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            {/* Close Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 right-8 text-white hover:text-gray-300 z-[110] bg-black/50 p-2 rounded-full"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {isLoading ? (
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin "></div>
            ) : videoKey ? (
                <div className="w-full h-full max-w-[90vw] max-h-[90vh] aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        title="Movie preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            ) : (
                <div className="text-white text-xl">No video available for this movie.</div>
            )
            }
        </div >
    );
}
export default MoviePlay
import { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoListProps {
  videos: Video[];
  isLoading: boolean;
  error: string | null;
}

const VideoList: React.FC<VideoListProps> = ({ videos, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading videos</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600">Try searching for something else</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;

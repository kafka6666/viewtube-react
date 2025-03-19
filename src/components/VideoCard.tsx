import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const openVideo = () => {
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
  };

  // Format ISO 8601 duration (e.g., PT8M45S) to MM:SS format
  const formatDuration = (duration: string): string => {
    if (!duration) return "0:00";
    
    // Extract hours, minutes, and seconds from the ISO duration
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
    const secondsMatch = duration.match(/(\d+)S/);
    
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;
    
    // Format as MM:SS or H:MM:SS if hours > 0
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div 
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={openVideo}
    >
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-48 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-2">
          <img 
            src={video.channelThumbnail} 
            alt={video.channelTitle} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.channelTitle}</p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span>{formatViews(video.views)} views</span>
              <span className="mx-1">•</span>
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

export default VideoCard;

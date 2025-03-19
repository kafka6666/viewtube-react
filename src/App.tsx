import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import { fetchVideos } from './services/api';
import { Video } from './types';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const getVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetchVideos();
        console.log('Response in App:', response);
        
        // Check the nested structure based on API response
        if (response && 
            response.data && 
            response.data.data && 
            Array.isArray(response.data.data)) {
          // Extract videos from the nested data structure
          const extractedVideos = response.data.data.map((item: any) => {
            // Map the item to our Video type format
            if (item.items) {
              return {
                _id: item.items.id || '',
                title: item.items.snippet?.title || '',
                description: item.items.snippet?.description || '',
                ageRestricted: false,
                channelTitle: item.items.snippet?.channelTitle || '',
                channelId: item.items.snippet?.channelId || '',
                channelThumbnail: item.items.snippet?.thumbnails?.default?.url || '',
                thumbnail: item.items.snippet?.thumbnails?.high?.url || '',
                videoId: item.items.id || '',
                tags: item.items.snippet?.tags || [],
                duration: item.items.contentDetails?.duration || '',
                views: parseInt(item.items.statistics?.viewCount || '0'),
                uploadedAt: item.items.snippet?.publishedAt || '',
                publishedAt: item.items.snippet?.publishedAt || '',
                isLiveContent: false
              };
            }
            return null;
          }).filter((video): video is Video => video !== null);
          
          setVideos(extractedVideos);
          setFilteredVideos(extractedVideos);
          setError(null);
        } else {
          setError('Invalid API response format');
        }
      } catch (err) {
        setError('Failed to fetch videos. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getVideos();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredVideos(videos);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = videos.filter(
      video => 
        video.title.toLowerCase().includes(lowercaseQuery) || 
        video.channelTitle.toLowerCase().includes(lowercaseQuery) ||
        video.description.toLowerCase().includes(lowercaseQuery) ||
        video.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredVideos(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg 
              className="w-8 h-8 text-red-600 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 13.5l-4-2.5v-5l4 2.5v5z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">ViewTube</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        {searchQuery && filteredVideos.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {filteredVideos.length} results for "{searchQuery}"
            </h2>
          </div>
        )}
        
        <VideoList 
          videos={filteredVideos} 
          isLoading={isLoading}
          error={error}
        />
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            ViewTube - A YouTube video listing app created with React & Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

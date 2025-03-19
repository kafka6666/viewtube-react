import { VideoResponse } from '../types';

const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

export const fetchVideos = async (): Promise<VideoResponse> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // The API response structure might be different than expected
    // Let's handle it properly by checking the structure
    console.log('API Response:', data);
    
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

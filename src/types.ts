export interface Video {
  _id: string;
  title: string;
  description: string;
  ageRestricted: boolean;
  channelTitle: string;
  channelId: string;
  channelThumbnail: string;
  thumbnail: string;
  videoId: string;
  tags: string[];
  duration: string;
  views: number;
  uploadedAt: string;
  publishedAt: string;
  isLiveContent: boolean;
}

// Updated to match the actual API response structure
export interface VideoResponse {
  statusCode: number;
  data: {
    page: number;
    limit: number;
    totalPages: number;
    previousPage: boolean;
    nextPage: boolean;
    totalItems: number;
    currentPageItems: number;
    data: any[]; // Array of video items with nested structure
  };
  message: string;
  success: boolean;
}

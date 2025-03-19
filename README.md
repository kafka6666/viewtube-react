# ViewTube

A YouTube-style video listing page built with React, TypeScript, and Tailwind CSS.

## Features

- Fetches and displays a list of YouTube videos from FreeAPI
- Shows video thumbnails, titles, and channel names
- Click on a video to open it in YouTube
- Search videos by title, channel name, description, or tags
- Responsive grid layout for better UX
- Visual indicators for video duration and view counts
- Error handling and loading states
- Mobile responsive design

## Technologies Used

- React with TypeScript
- Vite for fast development experience
- Tailwind CSS for styling
- FreeAPI for YouTube video data

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## API

This project uses the FreeAPI YouTube API endpoint:
- GET https://api.freeapi.app/api/v1/public/youtube/videos

## Screenshots

![ViewTube Screenshot](./public/ViewTube%20-%20001.png)

## Deployment

ViewTube Deployment- [https://viewtube-react.vercel.app/](https://viewtube-react.vercel.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

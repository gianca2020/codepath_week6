# Spotify Album Cover Generator

A React app that displays random album covers from Spotify's API.

## Features
- Display album covers from Spotify
- Random album selection
- Clean, modern UI

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd week_5
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy your Client ID and Client Secret
4. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
5. Replace the values in `.env` with your actual Spotify credentials:
```
VITE_SPOTIFY_CLIENT_ID=your_actual_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_actual_client_secret
```

### 4. Run the development server
```bash
npm run dev
```

## Tech Stack
- React
- Vite
- Spotify Web API

## Project Structure
```
src/
├── components/
│   └── AlbumCard.jsx    # Component for displaying album covers
├── API/
│   └── spotify.js       # Spotify API integration
└── App.jsx              # Main app component
```

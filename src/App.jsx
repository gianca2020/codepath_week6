//import { useState } from 'react'
import { useState } from 'react'
import './App.css'
import AlbumCard from './components/AlbumCard.jsx'
import Opinion from './components/Opinion.jsx'
import { getAlbumData } from './API/spotify.js'  // Add this import

function App() {
  const [currentAlbumID, setCurrentAlbumID] = useState("0ETFjACtuP2ADo6LFhL6HN");
  const [currentAlbumName, setCurrentAlbumName] = useState("");
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [dislikedAlbums, setDislikedAlbums] = useState([]);

  const handleAlbumChange = (newAlbumID) => {
    setCurrentAlbumID(newAlbumID);
  };

  const handleAlbumDataChange = (albumID, albumName) => {
    setCurrentAlbumName(albumName);
  };

  const handleLike = (albumID, albumName) => {
    // We need to get the full album data to store cover and release date
    getAlbumData(albumID).then(data => {
      const albumObj = { 
        id: albumID, 
        name: albumName,
        coverUrl: data.images && data.images.length > 0 ? data.images[0].url : null,
        releaseDate: data.release_date || 'Unknown'
      };
      setLikedAlbums(prev => [...prev.filter(album => album.id !== albumID), albumObj]);
      // Remove from disliked if it was there
      setDislikedAlbums(prev => prev.filter(album => album.id !== albumID));
    }).catch(err => {
      console.error("Error fetching album data for like:", err);
      // Fallback: add without cover/date
      const albumObj = { id: albumID, name: albumName, coverUrl: null, releaseDate: 'Unknown' };
      setLikedAlbums(prev => [...prev.filter(album => album.id !== albumID), albumObj]);
      setDislikedAlbums(prev => prev.filter(album => album.id !== albumID));
    });
  };

  const handleDislike = (albumID, albumName) => {
    // We need to get the full album data to store cover and release date
    getAlbumData(albumID).then(data => {
      const albumObj = { 
        id: albumID, 
        name: albumName,
        coverUrl: data.images && data.images.length > 0 ? data.images[0].url : null,
        releaseDate: data.release_date || 'Unknown'
      };
      setDislikedAlbums(prev => [...prev.filter(album => album.id !== albumID), albumObj]);
      // Remove from liked if it was there
      setLikedAlbums(prev => prev.filter(album => album.id !== albumID));
    }).catch(err => {
      console.error("Error fetching album data for dislike:", err);
      // Fallback: add without cover/date
      const albumObj = { id: albumID, name: albumName, coverUrl: null, releaseDate: 'Unknown' };
      setDislikedAlbums(prev => [...prev.filter(album => album.id !== albumID), albumObj]);
      setLikedAlbums(prev => prev.filter(album => album.id !== albumID));
    });
  };

  // Add these new functions:
  const handleRemoveLiked = (albumID) => {
    setLikedAlbums(prev => prev.filter(album => album.id !== albumID));
  };

  const handleRemoveDisliked = (albumID) => {
    setDislikedAlbums(prev => prev.filter(album => album.id !== albumID));
  };

  return (
    <>
      <div className='flex h-screen bg-gray-100'>
        {/* Left sidebar for liked albums */}
        <div className='w-64 bg-green-100 p-4 overflow-y-auto'>
          <h2 className='text-lg font-bold mb-4 text-green-800'>Liked Albums</h2>
          {likedAlbums.map((album, index) => (
            <div 
              key={index} 
              className='mb-3 p-3 bg-green-200 rounded-lg text-sm cursor-pointer hover:bg-green-300 transition-colors duration-200'
              onClick={() => handleRemoveLiked(album.id)}
              title="Click to remove from liked albums"
            >
              <div className="flex items-center gap-3">
                {album.coverUrl ? (
                  <img 
                    src={album.coverUrl} 
                    alt={`${album.name} cover`}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-green-300 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700 text-xs">No Image</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-green-800 truncate">{album.name}</div>
                  <div className="text-green-600 text-xs mt-1">Released: {album.releaseDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className='flex-1 flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold mb-8 text-gray-800'>Which new albums do you want to discover?</h1>
          <AlbumCard 
            albumID={currentAlbumID} 
            onAlbumChange={handleAlbumChange}
            onAlbumDataChange={handleAlbumDataChange}
          />
          <Opinion 
            currentAlbumID={currentAlbumID}
            currentAlbumName={currentAlbumName}
            onLike={handleLike}
            onDislike={handleDislike}
            isLiked={likedAlbums.some(album => album.id === currentAlbumID)}
            isDisliked={dislikedAlbums.some(album => album.id === currentAlbumID)}
          />
        </div>

        {/* Right sidebar for disliked albums */}
        <div className='w-64 bg-red-900 p-4 overflow-y-auto'>
          <h2 className='text-lg font-bold mb-4 text-white'>Disliked Albums</h2>
          {dislikedAlbums.map((album, index) => (
            <div 
              key={index} 
              className='mb-3 p-3 bg-red-800 rounded-lg text-sm cursor-pointer hover:bg-red-700 transition-colors duration-200'
              onClick={() => handleRemoveDisliked(album.id)}
              title="Click to remove from disliked albums"
            >
              <div className="flex items-center gap-3">
                {album.coverUrl ? (
                  <img 
                    src={album.coverUrl} 
                    alt={`${album.name} cover`}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-red-700 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-red-300 text-xs">No Image</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{album.name}</div>
                  <div className="text-red-300 text-xs mt-1">Released: {album.releaseDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}



export default App

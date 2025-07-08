//import { useState } from 'react'
import { useState } from 'react'
import './App.css'
import AlbumCard from './components/AlbumCard.jsx'
import Opinion from './components/Opinion.jsx'

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
    const albumObj = { id: albumID, name: albumName };
    setLikedAlbums(prev => [...prev.filter(album => album.id !== albumID), albumObj]);
    // Remove from disliked if it was there
    setDislikedAlbums(prev => prev.filter(album => album.id !== albumID));
  };

  const handleDislike = (albumID, albumName) => {
    const albumObj = { id: albumID, name: albumName };
    setDislikedAlbums(prev => [...prev.filter(album => album.id !== albumID), albumObj]);
    // Remove from liked if it was there
    setLikedAlbums(prev => prev.filter(album => album.id !== albumID));
  };

  return (
    <>
      <div className='flex h-screen bg-gray-100'>
        {/* Left sidebar for liked albums */}
        <div className='w-64 bg-green-50 p-4 overflow-y-auto'>
          <h2 className='text-lg font-bold mb-4 text-green-800'>Liked Albums</h2>
          {likedAlbums.map((album, index) => (
            <div key={index} className='mb-2 p-2 bg-green-100 rounded text-sm'>
              <div className="font-semibold">{album.name}</div>
              <div className="text-xs text-gray-600">{album.id}</div>
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
        <div className='w-64 bg-red-50 p-4 overflow-y-auto'>
          <h2 className='text-lg font-bold mb-4 text-red-800'>Disliked Albums</h2>
          {dislikedAlbums.map((album, index) => (
            <div key={index} className='mb-2 p-2 bg-red-100 rounded text-sm'>
              <div className="font-semibold">{album.name}</div>
              <div className="text-xs text-gray-600">{album.id}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}



export default App

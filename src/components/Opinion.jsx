import React from "react";

const Opinion = ({ currentAlbumID, currentAlbumName, onLike, onDislike, isLiked, isDisliked }) => {

    const handleLike = () => {
        onLike(currentAlbumID, currentAlbumName);
    }

    const handleDislike = () => {
        onDislike(currentAlbumID, currentAlbumName);
    }

    return(
        <div className="flex gap-4 mt-6">
            <button 
                onClick={handleLike}
                className={`px-6 py-2 rounded-full font-bold transition-colors duration-200 ${
                    isLiked 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white'
                }`}
            >
                 Like
            </button>
            <button 
                onClick={handleDislike}
                className={`px-6 py-2 rounded-full font-bold transition-colors duration-200 ${
                    isDisliked 
                        ? 'bg-red-600 text-white' 
                        : 'bg-white text-red-700 border-2 border-red-700 hover:bg-red-700 hover:text-white'
                }`}
            >
                 Dislike
            </button>
        </div>
    )
}

export default Opinion;
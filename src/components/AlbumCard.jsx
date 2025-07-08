import React, {useEffect, useState} from "react";
import {getAlbumData, getRandomAlbum} from "../API/spotify";

//later add title (or dont, iongaf)
const AlbumCard = ({albumID}) => {

    const [coverUrl, setCoverUrl] = useState("");
    const [currentAlbumID, setCurrentAlbumID] = useState(albumID);

    const fetchAlbumData = (id) => {
        console.log("Fetching album data for ID:", id);
        getAlbumData(id).then(data => {
            console.log("Received album data:", data);
            if (data && data.images && data.images.length > 0) {
                console.log("Setting cover URL:", data.images[0].url);
                setCoverUrl(data.images[0].url);
            } else {
                console.log("No images found in album data");
            }
        }).catch(err => {
            console.error("Error fetching album data:", err);
            console.error("Full error:", err.message);
        });
    };

    const handleRandomAlbum = () => {
        getRandomAlbum().then(randomAlbumID => {
            console.log("Got random album ID:", randomAlbumID);
            setCurrentAlbumID(randomAlbumID);
            fetchAlbumData(randomAlbumID);
        }).catch(err => {
            console.error("Error getting random album:", err);
        });
    };

    useEffect(() => {
        fetchAlbumData(currentAlbumID);
    }, [currentAlbumID]);

    return(
        <div className="flex flex-col items-center">
            {coverUrl ? (
                <>
                    <img src={coverUrl} alt="Album Cover" className="w-80 h-80 object-cover  shadow-lg" />
                    <button 
                        onClick={handleRandomAlbum}
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-2xl shadow-lg transition-colors duration-200"
                    >
                        Get Random Album
                    </button>
                </>
            ) : (
                <div className="w-80 h-80 flex items-center justify-center bg-gray-200 ">
                    <p className="text-gray-600">Loading...</p>
                </div>
            )}
        </div>
    )
}

export default AlbumCard;
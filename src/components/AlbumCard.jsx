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
        <div>
            <button onClick={handleRandomAlbum}>Get Random Album</button>
            {coverUrl ? (
                <img src={coverUrl} alt="Album Cover"  />
            ) : (
                <p>Loading...</p>
            )
        }
            
        </div>
    )
}

export default AlbumCard;
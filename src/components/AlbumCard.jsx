import React, {useEffect, useState} from "react";
import {getAlbumData} from "../API/spotify";

//later add title (or dont, iongaf)
const AlbumCard = ({albumID}) => {

    const [coverUrl, setCoverUrl] = useState("");

    useEffect(() => {
        console.log("Fetching album data for ID:", albumID);
        getAlbumData(albumID).then(data => {
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
    },[albumID]);

    return(
        <div>
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
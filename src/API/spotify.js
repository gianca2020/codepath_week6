const APIController = (function() {
    const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    //private methods
    const _getToken = async () => {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            //authentication
            headers: {
                'content-Type': 'application/x-www-form-urlencoded',

                'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
            },
            //client credentials 
            body: 'grant_type=client_credentials'
        });
        const data = await res.json();
        return data.access_token;
    }

    const getAlbumData = async (token, albumID) => {
        const res = await fetch(`https://api.spotify.com/v1/albums/${albumID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error("Failed to fetch album");
        const data = await res.json();
        return data;
    }

    const getRandomAlbum = async (token) => {
        const res = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error("Failed to fetch random album");
        const data = await res.json();

        const albums = data.albums.items;
        const randomIndex = Math.floor(Math.random() * albums.length);
        return albums[randomIndex].id;
    };

    return {
        getAlbumData: async function(albumID) {
            const token = await _getToken();
            return getAlbumData(token, albumID);
        },
        getRandomAlbum: async function() {
            const token = await _getToken();
            return getRandomAlbum(token);
        }
    }
})();

// Export the functions so other components can use them
export const getAlbumData = APIController.getAlbumData;
export const getRandomAlbum = APIController.getRandomAlbum;
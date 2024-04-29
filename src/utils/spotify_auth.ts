import { AuthToken } from "../models/auth.model";
import { SpotifyAlbumFull, SpotifyAlbumSearch } from "../models/spotify.model";

const SEARCH_URL = "https://api.spotify.com/v1/search?";
const ALBUM_URL = "https://api.spotify.com/v1/albums/:albumId";

export async function getAuthToken() {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID, // replace me
      client_secret: CLIENT_SECRET, // replace me
    }),
  })
    .then((res) => res.json())
    .then((res) => res as AuthToken);
}

export async function searchSpotifyAlbum(auth: AuthToken, albumName: string) {
  const url = new URL(SEARCH_URL);
  const params = new URLSearchParams({ q: albumName, type: "album" });

  return fetch(url.toString() + params, {
    headers: {
      Authorization: "Bearer " + auth.access_token,
    },
  })
    .then((res) => res.json())
    .then((res) => res as SpotifyAlbumSearch);
}

export async function getSpotifyAlbum(auth: AuthToken, albumId: string) {
  const url = ALBUM_URL.replace(":albumId", albumId);

  return fetch(url, {
    headers: {
      Authorization: "Bearer " + auth.access_token,
    },
  })
    .then((res) => res.json())
    .then((res) => res as SpotifyAlbumFull);
}

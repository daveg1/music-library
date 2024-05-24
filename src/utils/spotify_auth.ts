import { AuthToken } from "../models/auth.model";
import {
  SpotifyAlbumFull,
  SpotifyAlbumSearch,
  SpotifyError,
} from "../models/spotify.model";
import { readStorage } from "./localstorage";

const SEARCH_URL = "https://api.spotify.com/v1/search?";
const ALBUM_URL = "https://api.spotify.com/v1/albums/:albumId";

const CLIENT_ID = "replace me";
const CLIENT_SECRET = "replace me";

export async function getAuthToken() {
  // Check localstorage
  const { token } = readStorage();

  if (token) {
    return token;
  }

  // Otherwise query spotify
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  })
    .then((res) => res.json())
    .then((res) => res as AuthToken);
}

export async function searchSpotifyAlbum(albumName: string) {
  const token = await getAuthToken();
  const url = new URL(SEARCH_URL);
  const params = new URLSearchParams({ q: albumName, type: "album" });

  return fetch(url.toString() + params, {
    headers: {
      Authorization: "Bearer " + token.access_token,
    },
  })
    .then((res) => res.json())
    .then((res) => res as SpotifyAlbumSearch);
}

export async function getSpotifyAlbum(albumId: string) {
  const token = await getAuthToken();
  const url = ALBUM_URL.replace(":albumId", albumId);

  return fetch(url, {
    headers: {
      Authorization: "Bearer " + token.access_token,
    },
  })
    .then((res) => res.json())
    .then((res) => res as SpotifyAlbumFull | SpotifyError);
}

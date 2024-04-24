import { AuthToken } from "../models/auth.model";
import { SpotifyAlbumSearch } from "../models/spotify.model";

const SEARCH_URL = "https://api.spotify.com/v1/search?";

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

export async function getSpotifyAlbum(auth: AuthToken, album: string) {
  const url = new URL(SEARCH_URL);
  const params = new URLSearchParams({ q: album, type: "album" });

  return fetch(url.toString() + params, {
    headers: {
      Authorization: "Bearer " + auth.access_token,
    },
  })
    .then((res) => res.json())
    .then((res) => res as SpotifyAlbumSearch);
}

import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { SpotifyAlbumFull } from "../models/spotify.model";
import { getAuthToken, getSpotifyAlbum } from "../utils/spotify_auth";
import { useContext } from "react";
import { GlobalContext } from "../state";

export async function tracklistLoader({
  params,
}: LoaderFunctionArgs): Promise<SpotifyAlbumFull> {
  let { token, setToken } = useContext(GlobalContext);

  if (!token) {
    const newToken = await getAuthToken();
    setToken(newToken);
    token = newToken;
  }

  return await getSpotifyAlbum(token!, params.albumId!);
}

function Tracklist() {
  const album = useLoaderData() as SpotifyAlbumFull;

  function formatMs(ms: number) {
    const minutes = Math.floor(ms / 1000 / 60);
    const seconds = Math.floor(ms / 1000 - minutes * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <>
      <header className="my-4 flex items-end gap-4 leading-8">
        <img
          src={album.images[1].url}
          height="150"
          width="150"
          className="rounded-md shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold">{album.name}</h1>
          <aside>
            {album.artists[0].name} • {album.release_date} •{" "}
            {album.total_tracks} songs
          </aside>
        </div>
      </header>

      <section className="my-4 max-h-[calc(50vh)] overflow-y-auto rounded-lg bg-stone-100 p-2">
        {album.tracks.items.map((track, index) => (
          <div
            key={track.id}
            className="flex cursor-pointer select-none items-center gap-4 rounded-lg p-2 hover:bg-stone-200"
          >
            <div className="w-5 text-center">{index + 1}</div>

            <div className="flex w-full flex-col">
              <h3 className="text-sm font-semibold">{track.name}</h3>
              <p className="text-sm">{track.artists[0].name}</p>
            </div>

            <div>{formatMs(track.duration_ms)}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export { Tracklist };

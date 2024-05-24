import {
  SpotifyAlbumFull,
  SpotifyError,
  isSpotifyError,
} from "../models/spotify.model";
import { formatMs } from "../utils/format";
import { useEffect, useState } from "react";
import { getSpotifyAlbum } from "../utils/spotify_auth";
import { Loader } from "../components/Loader";
import { useParams } from "react-router-dom";

function Tracklist() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<SpotifyAlbumFull | null>(null);
  const [error, setError] = useState<SpotifyError | Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    getSpotifyAlbum(albumId ?? "")
      .then((d) => {
        if (ignore) return;

        if (isSpotifyError(d)) {
          setError(d);
        } else {
          setAlbum(d);
        }
      })
      .catch((e) => !ignore && setError(e))
      .finally(() => setIsLoading(false));

    return () => {
      ignore = true;
      setAlbum(null);
      setError(null);
    };
  }, [albumId]);

  return (
    <>
      {/* TODO: replace with skeletons */}
      {isLoading && (
        <div className="flex h-96 items-center justify-center">
          <Loader />
        </div>
      )}

      {error && <div className="py-4">Sorry, no track listings available.</div>}

      {album && (
        <>
          <header className="my-4 flex items-end gap-4 leading-8">
            <img
              src={album?.images?.[1]?.url}
              height="150"
              width="150"
              className="rounded-md shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold">{album.name}</h1>
              <aside>
                {album?.artists?.[0]?.name} • {album.release_date} •{" "}
                {album?.total_tracks} songs
              </aside>
            </div>
          </header>

          <section className="my-4 max-h-[calc(50vh)] overflow-y-auto rounded-lg bg-stone-100 p-2">
            {album?.tracks?.items.map((track, index) => (
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
      )}
    </>
  );
}

export { Tracklist };

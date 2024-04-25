import { FormEvent, useContext, useState } from "react";
import { getAlbumCoverArtURL, searchRelease } from "../utils/musicbrainz";
import { Release, formatSearchRelease } from "../models/release.model";
import { FlagIcon } from "../components/FlagIcon";
import { GlobalContext } from "../state";
import clsx from "clsx";

function Search() {
  const [results, setResults] = useState<Release[] | null>(null);
  const { releases, setReleases } = useContext(GlobalContext);

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const release = formData.get("release")?.toString();
    const artist = formData.get("artist")?.toString();
    const date = formData.get("date")?.toString();

    // We want at least release or artist to be present
    if (!release || !artist) {
      return;
    }

    const res = await searchRelease({ release, artist, date });
    setResults(res.releases.map(formatSearchRelease));
  }

  function addRelease(release: Release) {
    setReleases([...releases, release]);
  }

  function hasRelease(release: Release) {
    return releases.some((r) => r.id === release.id);
  }

  return (
    <>
      <h2 className="mb-2 mt-4 text-lg">Search</h2>

      <form
        className="flex flex-col items-start gap-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-1">
          <label className="cursor-pointer text-sm" htmlFor="release">
            Title
          </label>

          <input
            className="h-10 w-96 rounded border px-2 shadow-sm outline-none focus:border-amber-500"
            id="release"
            type="text"
            name="release"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="cursor-pointer text-sm" htmlFor="artist">
            Artist
          </label>

          <input
            className="h-10 w-96 rounded border px-2 shadow-sm outline-none focus:border-amber-500"
            id="artist"
            type="text"
            name="artist"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="cursor-pointer text-sm" htmlFor="date">
            Date
          </label>

          <input
            className="h-10 w-96 rounded border px-2 shadow-sm outline-none focus:border-amber-500"
            id="date"
            type="text"
            name="date"
          />
        </div>

        <div className="flex w-96 justify-end">
          <button className="flex h-10 items-center gap-1 rounded-full border border-amber-500 px-4 transition-colors hover:bg-amber-500 active:bg-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="-ms-1 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>

            <span>Search</span>
          </button>
        </div>
      </form>

      <h2 className="mb-2 mt-4 text-lg">Results</h2>

      {!results && <div className="text-sm">No search made yet.</div>}

      {results && !results.length && (
        <div className="text-sm">No results found.</div>
      )}

      {results && results.length && (
        <div className="flex flex-col pb-8">
          {results.map((result) => (
            <div
              className={clsx(
                "flex cursor-pointer select-none gap-2 rounded-lg p-2 hover:bg-gray-100",
                hasRelease(result) && "pointer-events-none opacity-50",
              )}
              key={result.id}
              onClick={() => addRelease(result)}
            >
              <img
                className="rounded-md bg-stone-200"
                src={getAlbumCoverArtURL(result.id)}
                height="100"
                width="100"
              />

              <div className="flex flex-col">
                <h2 className="text-md">{result.title}</h2>

                <p className="flex items-center gap-1 text-sm leading-6">
                  {result.artist}
                </p>

                <p className="flex items-center gap-1 text-sm leading-6">
                  <span>
                    <FlagIcon country={result.country} /> {result.country}
                  </span>{" "}
                  <span>&bull;</span>
                  <span>{result.date}</span>
                  <span>&bull;</span>
                  <span>{result.trackCount} tracks</span>
                </p>

                <p className="flex items-center gap-1 text-sm leading-6">
                  <span>{result.labelName ?? "—"}</span>
                  <span>&bull;</span>
                  <span>#{result.labelCatalogNo ?? "—"}</span>
                  <span>&bull;</span>
                  <span className="inline-flex h-4 items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 18v-12h2v12h-2zm4 0v-12h2v12h-2zm4 0v-12h1v12h-1zm8 0v-12h1v12h-1zm-5 0v-12h3v12h-3zm8 0v-12h2v12h-2zm4 0v-12h1v12h-1z" />
                    </svg>{" "}
                    {result.barcode || "—"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export { Search };

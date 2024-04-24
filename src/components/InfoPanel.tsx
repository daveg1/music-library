import { Dispatch, SetStateAction, useContext } from "react";
import { Release } from "../models/release.model";
import { getAlbumCoverArtURL } from "../utils/musicbrainz";
import { FlagIcon } from "./FlagIcon";
import { getSpotifyAlbum } from "../utils/spotify_auth";
import { GlobalContext } from "../state";

interface Props {
  selected: Release | null;
  setSelected: Dispatch<SetStateAction<Release | null>>;
}

function InfoPanel(props: Props) {
  const { selected, setSelected } = props;
  const { token, releases, setReleases } = useContext(GlobalContext);

  async function linkSpotify() {
    if (!selected || !token) return;
    const results = await getSpotifyAlbum(token, selected.title);
    console.log(results);

    const spotifyUrl = results.albums.items[0].external_urls.spotify;
    const updatedReleases = releases.map((r) => {
      if (r.id == selected.id) {
        r.spotifyUrl = spotifyUrl;
      }

      return r;
    });

    setReleases(updatedReleases);
  }

  function openSpotify() {
    window.open(selected?.spotifyUrl, "_blank");
  }

  function openTrackList() {
    // TODO: open something...
  }

  return (
    selected && (
      <aside className="fixed right-4 top-4 mr-4 flex h-4/5 w-96 flex-col gap-2 rounded-lg bg-stone-100 object-contain p-4">
        <header className="flex justify-between">
          <div>
            <h3 className="font-semibold leading-4">{selected.title}</h3>
            <p className="text-sm">{selected.artist}</p>
          </div>

          <button
            className="flex h-7 w-7 items-center justify-center self-start rounded-lg hover:bg-amber-200"
            onClick={() => setSelected(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </header>

        <div className="aspect-square w-full">
          <img
            src={getAlbumCoverArtURL(selected.id)}
            className="aspect-square w-full appearance-none rounded-lg bg-stone-200"
          />
        </div>

        <menu className="flex gap-2 py-1">
          {!selected.spotifyUrl && (
            <button
              className="flex h-8 items-center gap-1 rounded border border-stone-300 px-2 transition-colors hover:border-black hover:bg-black hover:text-white"
              onClick={linkSpotify}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-sm">Link Spotify</span>
            </button>
          )}

          {selected.spotifyUrl && (
            <>
              <button
                className="flex h-8 items-center gap-1 rounded border border-stone-300 px-2 transition-colors hover:border-black hover:bg-black hover:text-white"
                onClick={openSpotify}
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="-ms-1 scale-75"
                  fill="currentColor"
                >
                  <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
                </svg>
                <span className="text-sm">Open in Spotify</span>
              </button>

              <button
                className="flex h-8 items-center gap-1 rounded border border-stone-300 px-2 transition-colors hover:border-black hover:bg-black hover:text-white"
                onClick={openTrackList}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                </svg>

                <span className="text-sm">View tracklist</span>
              </button>
            </>
          )}
        </menu>

        <dl className="grid grid-cols-2 justify-between text-sm leading-6">
          <dt>ASIN</dt>
          <dd>{selected.asin || "-"}</dd>
          <dt>Barcode</dt>
          <dd>{selected.barcode || "-"}</dd>
          <dt>Country</dt>
          <dd>
            <FlagIcon country={selected.country} /> {selected.country}
          </dd>
          <dt>Date</dt>
          <dd>{selected.date}</dd>
          <dt>Label</dt>
          <dd>{selected.labelName}</dd>
          <dt>Catalog No.</dt>
          <dd>#{selected.labelCatalogNo}</dd>
          <dt>Language</dt>
          <dd>
            {selected.language}, {selected.languageScript}
          </dd>
          <dt>Format</dt>
          <dd className="flex gap-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="-ms-1 scale-75"
            >
              <path d="M14 12c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm10 0c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-15.44 4.912c-.572-.401-1.07-.899-1.471-1.471l-3.691 1.641c.859 1.45 2.071 2.662 3.521 3.521l1.641-3.691zm7.44-4.912c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4zm4.603-5.08c-.859-1.451-2.071-2.663-3.522-3.522l-1.641 3.691c.572.401 1.07.899 1.472 1.471l3.691-1.64z" />
            </svg>
            {selected.mediaFormat}
          </dd>
          <dt>Track count</dt>
          <dd>{selected.mediaTrackCount}</dd>
          <dt>Discs</dt>
          <dd>{selected.mediaDiscCount}</dd>
          <dt>Packaging</dt>
          <dd>{selected.packaging || ""}</dd>
          <dt>Release</dt>
          <dd>{selected.releaseType}</dd>
        </dl>
      </aside>
    )
  );
}

export { InfoPanel };

import { Dispatch, SetStateAction } from "react";
import { Release } from "../models/release.model";
import { getAlbumCoverArtURL } from "../utils/musicbrainz";
import { FlagIcon } from "./FlagIcon";

interface Props {
  selected: Release | null;
  setSelected: Dispatch<SetStateAction<Release | null>>;
}

function InfoPanel(props: Props) {
  const { selected, setSelected } = props;

  return (
    selected && (
      <aside className="fixed right-4 top-4 mr-4 flex h-4/5 w-96 flex-col gap-2 rounded-lg bg-stone-100 object-contain p-4">
        <header className="flex justify-between">
          <div>
            <h3 className="font-semibold">{selected.title}</h3>
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

        <dl className="grid grid-cols-2 justify-between text-sm leading-6">
          <dt>ASIN</dt>
          <dd>{selected.asin}</dd>
          <dt>Barcode</dt>
          <dd>{selected.barcode}</dd>
          <dt>Country</dt>
          <dd>
            <FlagIcon country={selected.country} /> {selected.country}
          </dd>
          <dt>Date</dt>
          <dd>{selected.date}</dd>
          <dt>Label</dt>
          <dd>{selected.labelName}</dd>
          <dt>Catalog No.</dt>
          <dd>#{selected.labelCatalogeNo}</dd>
          <dt>Language</dt>
          <dd>
            {selected.language}, {selected.languageScript}
          </dd>
          <dt>Format</dt>
          <dd>{selected.mediaFormat}</dd>
          <dt>Track count</dt>
          <dd>{selected.mediaTrackCount}</dd>
          <dt>Discs</dt>
          <dd>{selected.mediaDiscCount}</dd>
          <dt>Packaging</dt>
          <dd>{selected.packaging}</dd>
          <dt>Release</dt>
          <dd>{selected.releaseType}</dd>
        </dl>
      </aside>
    )
  );
}

export { InfoPanel };

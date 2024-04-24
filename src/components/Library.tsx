import { useContext } from "react";
import { GlobalContext } from "../state";
import { getAlbumCoverArtURL } from "../utils/musicbrainz";
import { Release } from "../models/release.model";

interface Props {
  onItemSelect: (item: Release) => void;
}

function Library(props: Props) {
  const { releases } = useContext(GlobalContext);

  return (
    <>
      <h2 className="mb-2 mt-4 text-lg">Library</h2>

      {!releases.length && <div>No items saved yet</div>}

      {releases.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {releases.map((release) => (
            <article
              key={release.id}
              className="flex cursor-pointer flex-col gap-1 rounded-lg p-2 hover:bg-gray-50"
              onClick={() => props.onItemSelect(release)}
            >
              <img
                className="aspect-square w-full rounded-lg bg-stone-200"
                src={getAlbumCoverArtURL(release.id)}
              />

              <div>
                <h3 className="text-sm leading-6">{release.title}</h3>
                <p className="text-xs">{release.artist}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export { Library };

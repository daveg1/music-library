import { SearchReleaseQuery } from "../models/release.model";

const BASE_RELEASE_URL = "http://musicbrainz.org/ws/2/release/?fmt=json";
const BASE_ALBUM_URL = "https://coverartarchive.org/release";

type Query = Record<string, string | undefined>;

export async function searchRelease(query: Query) {
  const url = `${BASE_RELEASE_URL}&query=${luceneQueryBuilder(query)}`;

  return (await fetch(url).then((res) => res.json())) as SearchReleaseQuery;
}

function luceneQueryBuilder(query: Query) {
  const AND = "%20AND%20";

  return Object.entries(query).reduce<string>((prev, [key, value]) => {
    return value ? prev + AND + key + ":" + value : prev;
  }, "");
}

export function getAlbumCoverArtURL(releaseId: string) {
  return `${BASE_ALBUM_URL}/${releaseId}/front`;
}

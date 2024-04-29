export interface SearchReleaseQuery {
  count: number;
  releases: SearchRelease[];
}

export interface Release {
  id: string;
  score: number;
  title: string;
  status: string;
  packaging: string;
  language: string; // text-rep
  languageScript: string; // text-rep
  artist: string;
  releaseType: string; // release-group.primary-type
  date: string;
  country: string;
  barcode: string;
  asin: string;
  labelCatalogNo: string;
  labelName: string;
  trackCount: number;
  mediaFormat: string;
  mediaDiscCount: number;
  mediaTrackCount: number;
  spotifyId?: string;
  spotifyUrl?: string;
}

export interface SearchRelease {
  id: string;
  score: number;
  title: string;
  status: string;
  packaging: string;
  "text-representation": {
    language: string;
    script: string;
  };
  "artist-credit": {
    name: string;
  }[];
  "release-group": {
    "primary-type": string;
  };
  date: string;
  country: string;
  barcode: string;
  asin: string;
  "label-info": {
    "catalog-number": string;
    label: {
      name: string;
    };
  }[];
  "track-count": number;
  media: {
    format: string;
    "disc-count": number;
    "track-count": number;
  }[];
}

export function formatSearchRelease(searchRelease: SearchRelease): Release {
  return {
    id: searchRelease.id,
    score: searchRelease.score,
    title: searchRelease.title,
    status: searchRelease.status,
    packaging: searchRelease.packaging,
    language: searchRelease["text-representation"].language, // text-rep
    languageScript: searchRelease["text-representation"].script, // text-rep
    artist: searchRelease["artist-credit"]?.[0]?.name ?? "",
    releaseType: searchRelease["release-group"]["primary-type"], // release-group.primary-type
    date: searchRelease.date,
    country: searchRelease.country,
    barcode: searchRelease.barcode,
    asin: searchRelease.asin,
    labelCatalogNo: searchRelease["label-info"]?.[0]?.["catalog-number"] ?? "",
    labelName: searchRelease["label-info"]?.[0]?.label.name ?? "",
    trackCount: searchRelease["track-count"],
    mediaFormat: searchRelease.media?.[0]?.format ?? "",
    mediaDiscCount: searchRelease.media?.[0]?.["disc-count"] ?? 0,
    mediaTrackCount: searchRelease.media?.[0]?.["track-count"] ?? 0,
  };
}

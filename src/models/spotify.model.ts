interface SpotifyPaginatedType<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface SpotifyClassType {
  /**
   * Dictionary of external URLs
   */
  external_urls: {
    spotify: string;
  };

  /**
   * Spotify API URL
   */
  href: string;

  /**
   * Spotify API ID
   */
  id: string;

  /**
   * Instance name
   */
  name: string;

  /**
   * Class name
   */
  type: string;

  /**
   * Spotify URI
   */
  uri: string;
}

export interface SpotifyAlbumSearch {
  albums: SpotifyPaginatedType<SpotifyAlbum>;
}

export interface SpotifyAlbum extends SpotifyClassType {
  album_type: string;
  artists: SpotifyClassType[];
  available_markets: string[];
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
}

export interface SpotifyAlbumFull extends SpotifyAlbum {
  copyrights: [];
  external_ids: { upc: string };
  genres: string[];
  label: string;
  popularity: number;
  tracks: SpotifyAlbumTracks;
}

interface SpotifyTrack extends SpotifyClassType {
  artists: { name: string }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  is_local: boolean;
  preview_url: string | null;
  track_number: number;
}
export interface SpotifyAlbumTracks {
  items: SpotifyTrack[];
}

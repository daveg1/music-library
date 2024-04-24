import { Dispatch, SetStateAction, createContext } from "react";
import { Release } from "./models/release.model";
import { AuthToken } from "./models/auth.model";

export const GlobalContext = createContext<{
  releases: Release[];
  setReleases: Dispatch<SetStateAction<Release[]>>;
  selectedRelease: Release | null;
  setSelectedRelease: Dispatch<SetStateAction<Release | null>>;
  token: AuthToken | null;
  setToken: Dispatch<SetStateAction<AuthToken | null>>;
}>({
  releases: [],
  setReleases: () => {},
  selectedRelease: null,
  setSelectedRelease: () => {},
  token: null,
  setToken: () => {},
});

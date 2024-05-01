import { Dispatch, SetStateAction, createContext } from "react";
import { Release } from "./models/release.model";

export const GlobalContext = createContext<{
  releases: Release[];
  setReleases: Dispatch<SetStateAction<Release[]>>;
  selectedRelease: Release | null;
  setSelectedRelease: Dispatch<SetStateAction<Release | null>>;
}>({
  releases: [],
  setReleases: () => {},
  selectedRelease: null,
  setSelectedRelease: () => {},
});

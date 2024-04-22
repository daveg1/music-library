import { Dispatch, SetStateAction, createContext } from "react";
import { Release } from "./models/release.model";

export const GlobalContext = createContext<{
  releases: Release[];
  setReleases: Dispatch<SetStateAction<Release[]>>;
}>({ releases: [], setReleases: () => {} });

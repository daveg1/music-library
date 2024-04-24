import { Dispatch, SetStateAction, createContext } from "react";
import { Release } from "./models/release.model";
import { AuthToken } from "./models/auth.model";

export const GlobalContext = createContext<{
  releases: Release[];
  setReleases: Dispatch<SetStateAction<Release[]>>;
  token: AuthToken | null;
  setToken: Dispatch<SetStateAction<AuthToken | null>>;
}>({
  releases: [],
  setReleases: () => {},
  token: null,
  setToken: () => {},
});

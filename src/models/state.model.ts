import { AuthToken } from "./auth.model";
import { Release } from "./release.model";

export interface State {
  releases: Release[];
  token: AuthToken | null;
}

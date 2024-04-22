import { State } from "../models/state.model";

const LOCAL_STORAGE_KEY = "music-library-853479yzxjih";

const DEFAULT_STATE = {
  releases: [],
} satisfies State;

export function writeStorage(newState: State) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
}

export function readStorage(): State {
  return <State>(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? JSON.stringify(DEFAULT_STATE),
    )
  );
}

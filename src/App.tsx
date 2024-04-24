import "./App.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { GlobalContext } from "./state";
import { Release } from "./models/release.model";
import { Search } from "./components/Search";
import { readStorage, writeStorage } from "./utils/localstorage";
import { Library } from "./components/Library";
import { InfoPanel } from "./components/InfoPanel";
import { getAuthToken } from "./utils/spotify_auth";
import { AuthToken } from "./models/auth.model";

function App() {
  const state = readStorage();

  const [token, setToken] = useState<AuthToken | null>(null);
  const [releases, setReleases] = useState<Release[]>(state.releases);
  const [tab, setTab] = useState<"library" | "search">("library");
  const [selected, setSelected] = useState<Release | null>(null);

  useEffect(() => {
    writeStorage({ releases, token });
  }, [releases, token]);

  useEffect(() => {
    async function getToken() {
      const token = await getAuthToken();
      setToken(token);
    }

    if (!token) {
      getToken();
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ releases, setReleases, token, setToken }}>
      <header className="mx-auto max-w-screen-md px-4 py-4">
        <h1 className="text-xl font-semibold">Music Library</h1>
      </header>

      <menu className="mx-auto flex max-w-screen-md gap-4 px-4">
        <button
          className={clsx(
            "border-b-2",
            tab === "library" && "border-b-amber-400",
          )}
          type="button"
          onClick={() => setTab("library")}
        >
          Library
        </button>

        <button
          className={clsx(
            "border-b-2",
            tab === "search" && "border-b-amber-400",
          )}
          type="button"
          onClick={() => {
            setTab("search");
            setSelected(null);
          }}
        >
          Search
        </button>
      </menu>

      <main className="mx-auto max-w-screen-md px-4">
        <section className={clsx(tab === "library" ? "block" : "hidden")}>
          <Library onItemSelect={(item) => setSelected(item)} />
        </section>

        <section className={clsx(tab === "search" ? "block" : "hidden")}>
          <Search />
        </section>
      </main>

      <InfoPanel selected={selected} setSelected={setSelected} />
    </GlobalContext.Provider>
  );
}

export default App;

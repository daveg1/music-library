import "./App.css";
import { useEffect, useState } from "react";
import { GlobalContext } from "./state";
import { Release } from "./models/release.model";
import { Search } from "./routes/Search";
import { readStorage, writeStorage } from "./utils/localstorage";
import { Library } from "./routes/Library";
import { getAuthToken } from "./utils/spotify_auth";
import { AuthToken } from "./models/auth.model";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./routes/Layout";

function App() {
  const state = readStorage();

  const [token, setToken] = useState<AuthToken | null>(null);
  const [releases, setReleases] = useState<Release[]>(state.releases);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

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

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          path: "/library",
          Component: Library,
        },
        {
          path: "/search",
          Component: Search,
        },
      ],
    },
  ]);

  return (
    <GlobalContext.Provider
      value={{
        releases,
        setReleases,
        selectedRelease,
        setSelectedRelease,
        token,
        setToken,
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}

export default App;

import "./App.css";
import { useEffect, useState } from "react";
import { GlobalContext } from "./state";
import { Release } from "./models/release.model";
import { Search } from "./routes/Search";
import { readStorage, writeStorage } from "./utils/localstorage";
import { Library } from "./routes/Library";
import { getAuthToken, getSpotifyAlbumTracks } from "./utils/spotify_auth";
import { AuthToken } from "./models/auth.model";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Layout } from "./routes/Layout";
import { Tracklist, tracklistLoader } from "./routes/Tracklist";

function App() {
  const state = readStorage();

  const [token, setToken] = useState<AuthToken | null>(null);
  const [releases, setReleases] = useState<Release[]>(state.releases);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  useEffect(() => {
    writeStorage({ releases, token: null });
  }, [releases]);

  // useEffect(() => {
  //   async function getToken() {

  //   }

  //   if (!token) {
  //     getToken();
  //   }
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      loader: async () => {
        if (!token) {
          setToken(await getAuthToken());
        }
        return null;
      },
      children: [
        {
          path: "/library",
          element: <Library />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/tracklist/:albumId",
          element: <Tracklist />,
          loader: tracklistLoader,
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

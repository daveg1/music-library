import "./App.css";
import { useEffect, useState } from "react";
import { GlobalContext } from "./state";
import { Release } from "./models/release.model";
import { Search } from "./routes/Search";
import { readStorage, writeStorage } from "./utils/localstorage";
import { Library } from "./routes/Library";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./routes/Layout";
import { Tracklist } from "./routes/Tracklist";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const state = readStorage();

  const [releases, setReleases] = useState<Release[]>(state.releases);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  useEffect(() => {
    writeStorage({ releases, token: null });
  }, [releases]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Library />,
          index: true,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/tracklist/:albumId",
          element: <Tracklist />,
          // loader: tracklistLoader,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
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
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GlobalContext.Provider>
  );
}

export default App;

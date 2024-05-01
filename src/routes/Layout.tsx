import clsx from "clsx";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GlobalContext } from "../state";
import { InfoPanel } from "../components/InfoPanel";
import { useAuth } from "../contexts/AuthContext";

function Layout() {
  const { setSelectedRelease } = useContext(GlobalContext);
  const { token, signIn } = useAuth();

  if (!token) {
    signIn();
  }

  const routeLinks: {
    path: string;
    text: string;
    onClick?: () => void;
  }[] = [
    { path: "/", text: "Library" },
    {
      path: "/search",
      text: "Search",
      onClick: () => setSelectedRelease(null),
    },
    {
      path: "/tracklist",
      text: "Track List",
      onClick: () => setSelectedRelease(null),
    },
  ];

  return (
    <>
      <header className="mx-auto max-w-screen-md px-4 py-4">
        <h1 className="text-xl font-semibold">Music Library</h1>
      </header>

      <menu className="mx-auto flex max-w-screen-md gap-4 px-4">
        {routeLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              clsx("border-b-2", isActive && "border-b-amber-400")
            }
            onClick={link.onClick}
            unstable_viewTransition
          >
            {link.text}
          </NavLink>
        ))}
      </menu>

      <main className="mx-auto max-w-screen-md px-4">
        <Outlet />
      </main>

      <InfoPanel />
    </>
  );
}

export { Layout };

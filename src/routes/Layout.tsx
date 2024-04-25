import clsx from "clsx";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GlobalContext } from "../state";
import { InfoPanel } from "../components/InfoPanel";

function Layout() {
  const { setSelectedRelease } = useContext(GlobalContext);

  return (
    <>
      <header className="mx-auto max-w-screen-md px-4 py-4">
        <h1 className="text-xl font-semibold">Music Library</h1>
      </header>

      <menu className="mx-auto flex max-w-screen-md gap-4 px-4">
        <NavLink
          to={"/library"}
          className={({ isActive }) =>
            clsx("border-b-2", isActive && "border-b-amber-400")
          }
        >
          Library
        </NavLink>

        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            clsx("border-b-2", isActive && "border-b-amber-400")
          }
          onClick={() => setSelectedRelease(null)}
        >
          Search
        </NavLink>
      </menu>

      <main className="mx-auto max-w-screen-md px-4">
        <Outlet />
      </main>

      <InfoPanel />
    </>
  );
}

export { Layout };

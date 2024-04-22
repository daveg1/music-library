import clsx from "clsx";
import "./FlagIcon.css";

function FlagIcon(props: { country: string }) {
  return (
    <div
      className={clsx("flag", "flag-" + props.country.toLocaleLowerCase())}
    ></div>
  );
}

export { FlagIcon };

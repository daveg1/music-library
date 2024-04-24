import clsx from "clsx";
import "./FlagIcon.css";

function FlagIcon(props: { country?: string }) {
  return (
    <span
      className={clsx("flag", "flag-" + props.country?.toLocaleLowerCase())}
    ></span>
  );
}

export { FlagIcon };

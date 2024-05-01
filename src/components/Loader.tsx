import clsx from "clsx";
import "./Loader.css";

interface Props {
  size?: "normal" | "mini";
}

function Loader({ size }: Props) {
  return <div className={clsx("Loader", size && `Loader--${size}`)}></div>;
}

export { Loader };

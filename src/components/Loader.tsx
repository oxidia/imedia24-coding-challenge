import clsx from "clsx";

type Props = {
  className?: string;
};

export default function Loader(props: Props) {
  const { className } = props;

  return (
    <div
      className={clsx(
        "w-20 h-20 rounded-full border-4 animate-spin",
        className
      )}
      style={{ borderTopColor: "#F5BB00" }}
    />
  );
}

import { forwardRef } from "react";

type Props = {
  name: string;
};

export default forwardRef(function Pokemon(props: Props, ref: any) {
  const { name } = props;

  return (
    <div ref={ref} className="shadow-md py-2 px-4">
      <span>{name}</span>
    </div>
  );
});

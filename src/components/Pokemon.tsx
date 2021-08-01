import { forwardRef } from "react";
import { getPokemonImageUrl } from "api/pokemon-api";

type Props = {
  id: number;
  name: string;
  onClick?: (id: number) => void;
};

export default forwardRef(function Pokemon(props: Props, ref: any) {
  const { id, name, onClick } = props;

  function onItemClickHandler() {
    if (typeof onClick === "function") {
      onClick(id);
    }
  }

  return (
    <section
      onClick={onItemClickHandler}
      ref={ref}
      className="shadow-md py-2 px-4 cursor-pointer hover:bg-gray-100"
    >
      <h1 className="text-black text-center font-medium py-2">{name}</h1>
      <img className="w-full" alt={name} src={getPokemonImageUrl(id)} />
    </section>
  );
});

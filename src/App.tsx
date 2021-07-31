import useInfiniteScroll from "react-infinite-scroll-hook";
import Pokemon from "components/Pokemon";
import useLoadPokemons from "hooks/useLoadPokemons";

export default function App() {
  const { loading, data, error, loadMore } = useLoadPokemons({ limit: 100 });
  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: true,
    disabled: Boolean(error),
    rootMargin: "0px 0px 100px 0px",
    onLoadMore() {
      loadMore();
    }
  });

  return (
    <div>
      <h1 className="text-5xl text-center mt-20">Pokemons</h1>
      <div className="container mx-auto px-2 md:px-0 pb-2 grid grid-cols-4 gap-4">
        {error && <h2>Something went wrong</h2>}

        {data.map(function createPokemon(item: any) {
          const { name } = item;

          return <Pokemon key={name} name={name} />;
        })}
        <div ref={infiniteRef}>Loading...</div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Pokemon from "components/Pokemon";
import useLoadPokemons from "hooks/useLoadPokemons";
import PokemonModal from "components/PokemonModal";
import Loader from "components/Loader";
import { getPokemonById } from "api/pokemon-api";
import * as _ from "lib/_";

type PokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
};

export default function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number>(-1);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [loadingPokemon, setLoadingPokemon] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const { loading, hasNextPage, data, error, loadMore } = useLoadPokemons({
    limit: 50,
    keyword: keyword
  });

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasNextPage,
    disabled: Boolean(error),
    rootMargin: "0px 0px 100px 0px",
    onLoadMore() {
      loadMore();
    }
  });

  useEffect(
    function loadPokemon() {
      if (selectedItemId <= -1) {
        return;
      }

      setLoadingPokemon(true);
      setShowModal(true);
      getPokemonById(selectedItemId)
        .then((pokemon) => {
          setSelectedPokemon(pokemon);
          setLoadingPokemon(false);
        })
        .catch(() => {
          setLoadingPokemon(false);
        });
    },
    [selectedItemId]
  );

  function getIdFromUrl(url: string) {
    const id = url
      .split("/")
      .filter((str: string) => str.length > 0)
      .pop();

    return parseInt(id as string, 10);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setKeyword(value);
  }

  return (
    <div>
      <h1 className="text-5xl text-center my-20">Pokemons</h1>
      <div className="container mx-auto my-10 ">
        <input
          className="w-1/4 min-w-mid outline-none h-12 text-xl rounded-2xl shadow p-1.5 px-3.5"
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={handleChange}
        />
      </div>

      {error && (
        <h2 className="text-center text-5xl text-red-400">
          Something went wrong
        </h2>
      )}

      <main className="container mx-auto px-2 md:px-0 pb-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {data.map(function createPokemon(item: any) {
          const { url, name } = item;
          const id = getIdFromUrl(url);

          return (
            <Pokemon key={id} id={id} name={name} onClick={setSelectedItemId} />
          );
        })}
      </main>
      {hasNextPage && (
        <div ref={infiniteRef} className="flex justify-center w-full">
          <Loader />
        </div>
      )}

      <PokemonModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        loading={loadingPokemon}
        data={
          selectedPokemon
            ? (_.pick(
                ["id", "name", "height", "weight"],
                selectedPokemon
              ) as PokemonData)
            : null
        }
      />
    </div>
  );
}

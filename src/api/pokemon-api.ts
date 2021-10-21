import axios from "axios";

const pokeImgUrlDreamWorld: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";
const pokeImgUrlOfficialArtwork: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const DreamWorldArtLimit: number = 649; // number of available artwork in DreamWorld
const MaxApiElements: number = 898; // max count of valid data in pokeApi

type GetPokemonsListParams = {
  limit?: number;
  offset?: number;
  keyword: string;
};

axios.defaults.baseURL = "https://pokeapi.co/api/v2";
axios.defaults.timeout = 5000; // 5s

export async function getPokemonsList(
  options?: GetPokemonsListParams
): Promise<any> {
  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  if (options?.keyword) {
    return await getPokemonsByKeyword({ ...options, limit, offset });
  }

  const { data } = await axios.get("/pokemon", {
    params: {
      limit: limit,
      offset: offset
    }
  });

  return data;
}

export async function getPokemonsByKeyword(
  options: GetPokemonsListParams
): Promise<any> {
  const { data } = await axios.get("/pokemon", {
    params: {
      offset: 0,
      limit: MaxApiElements
    }
  });
  const offset = options.offset || 0;
  const limit = options!.limit || 10;

  const res = data.results.filter((pokemon: any) =>
    pokemon.name.includes(options!.keyword)
  );

  const count = res.length;

  return {
    ...data,
    count: count,
    results: res.slice(offset, limit + offset)
  };
}

export async function getPokemonById(id: number): Promise<any> {
  const { data } = await axios.get(`/pokemon/${id}`);

  return data;
}

export function getPokemonImageUrl(id: number) {
  if (id <= DreamWorldArtLimit) {
    return `${pokeImgUrlDreamWorld}/${id}.svg`;
  }
  return `${pokeImgUrlOfficialArtwork}/${id}.png`;
}

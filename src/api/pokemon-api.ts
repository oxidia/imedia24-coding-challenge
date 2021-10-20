import axios from "axios";

const pokeImgUrlDreamWorld: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";
const pokeImgUrlOfficialArtwork: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const DreamWorldArtLimit: number = 649; // number of disponible artwork in DreamWorld

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
    return getPokemonsByKeyword({ ...options, limit, offset });
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
      limit: 2000
    }
  });

  const res = data.results.filter((pokemon: any) =>
    pokemon.name.startsWith(options!.keyword)
  );

  return { ...data, results: res, count: res.length };
}

export async function getPokemonById(id: number): Promise<any> {
  const { data } = await axios.get(`/pokemon/${id}`);

  return data;
}

export function getPokemonImageUrl(id: number) {
  if (id <= DreamWorldArtLimit) return `${pokeImgUrlDreamWorld}/${id}.svg`;
  return `${pokeImgUrlOfficialArtwork}/${id}.png`;
}

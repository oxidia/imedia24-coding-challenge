import axios from "axios";

type GetPokemonsListParams = {
  limit?: number;
  offset?: number;
  keyword?: string;
};

axios.defaults.baseURL = "https://pokeapi.co/api/v2";
axios.defaults.timeout = 5000; // 5s

export async function getPokemonsList(
  options?: GetPokemonsListParams
): Promise<any> {
  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  console.log("ok => ", options?.keyword);
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
  const { data } = await axios.get("/pokemon");

  return data
    .filter((pokemon: any) => pokemon.name.starWith(options!.keyword))
    .slice(options!.offset, options!.limit);
}

export async function getPokemonById(id: number): Promise<any> {
  const { data } = await axios.get(`/pokemon/${id}`);

  return data;
}

export function getPokemonImageUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}

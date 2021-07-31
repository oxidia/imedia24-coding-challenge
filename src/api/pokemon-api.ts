import axios from "axios";

type GetPokemonsListParams = {
  limit?: number;
  offset?: number;
};

axios.defaults.baseURL = "https://pokeapi.co/api/v2";
axios.defaults.timeout = 5000; // 5s

export async function getPokemonsList(
  options?: GetPokemonsListParams
): Promise<any> {
  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  const { data } = await axios.get("/pokemon", {
    params: {
      limit: limit,
      offset: offset
    }
  });
  return data;
}

import { useState } from "react";
import * as pApi from "api/pokemon-api";

type Props = {
  limit?: number;
  offset?: number;
};

type State = {
  loading: boolean;
  data: any[];
  error?: any;
};

export default function useLoadPokemons(props: Props) {
  const [limit] = useState<number>(props.limit ?? 20);
  const [offset, setOffset] = useState<number>(props.offset ?? -1);
  const [state, setState] = useState<State>({
    loading: false,
    data: []
  });

  function loadMore() {
    const newOffset = offset + 1;
    setOffset(newOffset);

    setState({
      loading: true,
      data: state.data
    });

    console.log(offset);
    pApi
      .getPokemonsList({ limit: limit, offset: newOffset * limit })
      .then(function updateState(data: any) {
        setState(function updateData(oldState: State) {
          return {
            loading: false,
            data: oldState.data.concat(data.results)
          };
        });
      })
      .catch(function setError(error: any) {
        setState({
          loading: false,
          data: [],
          error: error
        });
      });
  }

  return { ...state, loadMore };
}

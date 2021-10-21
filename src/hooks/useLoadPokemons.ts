import { useState, useEffect } from "react";
import * as pApi from "api/pokemon-api";

type Props = {
  limit?: number;
  offset?: number;
  keyword: string;
};

type State = {
  loading: boolean;
  count: number;
  hasNextPage: boolean;
  data: any[];
  error?: any;
};

export default function useLoadPokemons(props: Props) {
  const [limit] = useState<number>(props.limit ?? 20);
  const [offset, setOffset] = useState<number>(props.offset ?? -1);
  const [state, setState] = useState<State>({
    loading: false,
    data: [],
    count: 0,
    hasNextPage: true
  });

  function loadMore() {
    const newOffset = offset + 1;
    setOffset(newOffset);

    setState({
      loading: true,
      data: state.data,
      count: state.count,
      hasNextPage: state.data.length < state.count
    });

    pApi
      .getPokemonsList({
        limit: limit,
        offset: newOffset * limit,
        keyword: props.keyword
      })
      .then(function updateState(data: any) {
        setState(function updateData(oldState: State) {
          const newData = oldState.data.concat(data.results);

          return {
            loading: false,
            count: data.count,
            data: newData,
            hasNextPage: newData.length < data.count
          };
        });
      })
      .catch(function setError(error: any) {
        setState({
          loading: false,
          count: 0,
          data: [],
          error: error,
          hasNextPage: false
        });
      });
  }

  useEffect(() => {
    setState({ loading: false, data: [], count: 0, hasNextPage: true });
    setOffset(-1);
  }, [props.keyword]);

  return { ...state, loadMore };
}

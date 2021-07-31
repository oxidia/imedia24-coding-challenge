import React from "react";
import Modal from "./Modal";
import Loader from "components/Loader";
import { getPokemonImageUrl } from "api/pokemon-api";

type PokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
};

type Props = {
  showModal: boolean;
  onClose: (e: React.MouseEvent) => void;
  data: PokemonData | null;
  loading: boolean;
};

export default function PokemonModal(props: Props) {
  const { showModal, onClose, data, loading } = props;

  return (
    <Modal onClose={onClose} showModal={showModal}>
      {loading && <Loader />}
      {data && !loading && (
        <div className="max-w-md bg-white p-4 rounded-md">
          <h1 className="text-black text-center text-4xl font-medium">
            {data.name}
          </h1>
          <img
            className="w-full"
            alt={data.name}
            src={getPokemonImageUrl(data.id)}
          />
          <div className="flex">
            <div className="py-2 mr-2">
              <span className="font-bold">Height: </span>
              <span>{data.height}</span>
            </div>
            <div className="py-2">
              <span className="font-bold">Weight: </span>
              <span>{data.weight}</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

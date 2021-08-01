import { render, screen, fireEvent } from "@testing-library/react";
import Pokemon from "components/Pokemon";
import { useState } from "react";

function MockPokemon(props: { id: number }) {
  const [id, setId] = useState<number>(-1);

  return (
    <div>
      <Pokemon id={props.id} name="bulbasaur" onClick={setId} />
      <span>{id}</span>
    </div>
  );
}

describe("Pokemon component", () => {
  it("Should display pokemon name", () => {
    const name = "bulbasaur";

    render(<Pokemon id={1} name={name} />);

    const headingElement = screen.getByText(name);

    expect(headingElement).toBeInTheDocument();
  });

  it("Should display pokemon id onClick", () => {
    const name = "bulbasaur";
    const id = 1;

    render(<MockPokemon id={id} />);

    const headingElement = screen.getByText(name);

    fireEvent.click(headingElement);

    const spanElement = screen.getByText(id);

    expect(spanElement.textContent).toBe(id.toString());
  });
});

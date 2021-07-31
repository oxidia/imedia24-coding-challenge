import { render, screen } from "@testing-library/react";
import Pokemon from "components/Pokemon";

describe("Pokemon component", () => {
  it("renders hello world", () => {
    const name = "bulbasaur";

    render(<Pokemon id={1} name={name} />);

    const spanElement = screen.getByText(name);

    expect(spanElement).toBeInTheDocument();
  });
});

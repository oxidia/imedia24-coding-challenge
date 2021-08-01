import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "components/Modal";
import { useState } from "react";

function MockModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}></button>
      <Modal showModal={showModal}>
        <div>Content</div>
      </Modal>
    </>
  );
}

describe("Modal component", () => {
  it("Should show hide and show Modal", () => {
    const { container } = render(<MockModal />);

    const buttonElement = screen.getByRole("button");
    const divElement = container.querySelector("div");

    expect(divElement?.className).toContain("hidden");

    fireEvent.click(buttonElement);

    expect(divElement?.className).toContain("flex");
  });
});

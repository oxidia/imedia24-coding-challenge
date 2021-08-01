import React, { useEffect } from "react";
import clsx from "clsx";
import SquareXIcon from "./icons/SquareXIcon";

type Props = {
  showModal?: boolean;
  children: any;
  onClose?: (e: React.MouseEvent) => void;
};

export default function Modal(props: Props) {
  const { showModal = false, children, onClose } = props;

  useEffect(() => {
    if (showModal) {
      window.document.body.classList.add("overflow-y-hidden");
    }

    return () => {
      window.document.body.classList.remove("overflow-y-hidden");
    };
  }, [showModal]);

  function contentClickHandler(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      data-role="modal"
      onClick={onClose}
      className={clsx(
        "flex justify-center items-center z-10 top-0 left-0 w-full h-full bg-black bg-opacity-75",
        {
          fixed: showModal,
          hidden: !showModal
        }
      )}
    >
      <SquareXIcon className="absolute top-5 right-5 w-16 h-16 cursor-pointer text-white hover:text-gray-300" />
      <div onClick={contentClickHandler}>{children}</div>
    </div>
  );
}

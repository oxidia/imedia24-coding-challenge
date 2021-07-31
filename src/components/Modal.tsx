import React from "react";
import clsx from "clsx";

type Props = {
  showModal: boolean;
  children: any;
  onClose: (e: React.MouseEvent) => void;
};

export default function Modal(props: Props) {
  const { showModal, children, onClose } = props;

  function contentClickHandler(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={onClose}
      className={clsx(
        "flex justify-center items-center z-10 top-0 left-0 w-full h-full bg-black bg-opacity-75",
        {
          fixed: showModal,
          hidden: !showModal
        }
      )}
    >
      <div onClick={contentClickHandler}>{children}</div>
    </div>
  );
}

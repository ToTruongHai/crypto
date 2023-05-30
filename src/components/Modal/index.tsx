import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => {} | void;
  onConfirm: () => {} | void;
  children: any;
};

const Modal = ({ isOpen, onClose, children, onConfirm }: Props) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg z-10">
        {children}
        <div className="mt-4  flex gap-5">
          <button
            className="bg-rose-500 text-white rounded hover:bg-blue-600 py-2 px-4"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className=" bg-green-500 text-white rounded hover:bg-lime-600 py-2 px-4"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

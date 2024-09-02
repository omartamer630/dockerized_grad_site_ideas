import React from "react";

import { DialogProps } from "../types";
import NewIdea from "./idea/NewIdea";

const DialogPanel: React.FC<DialogProps> = ({ isOpen, onClose, cardData }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      {/* Dialog Panel */}
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-scroll">
        <div className="flex items-start relative  p-6 rounded-lg shadow-lg w-full h-full">
          {/* Close Button */}
          <button
            className="absolute top-0 text-4xl right-4 text-white hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <NewIdea cardData={cardData} />
        </div>
      </div>
    </div>
  );
};

export default DialogPanel;

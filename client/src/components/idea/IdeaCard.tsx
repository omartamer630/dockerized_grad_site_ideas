import { useEffect, useRef, useState } from "react";
import { IdeaCardProps } from "../../types";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useNavigate, useSearchParams } from "react-router-dom";
import DialogPanel from "../DialogPanel";
import { useDeleteIdea } from "../../hooks";

const IdeaCard: React.FC<IdeaCardProps> = ({ refresh, cardData }) => {
  const [searchParams] = useSearchParams();
  const [sanitizedTitle, setSanitizedTitle] = useState<string>("");
  const navigate = useNavigate();

  const { loading, success, error, handleDeleteIdea } = useDeleteIdea();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const optionCardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Function to handle click events
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the options card
      if (
        optionCardRef.current &&
        !optionCardRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false); // Close the menu if clicking outside
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const convertAndSanitizeTitle = async () => {
      const rawHtml = await marked(cardData.title);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setSanitizedTitle(sanitizedHtml);
    };

    convertAndSanitizeTitle();
  }, [cardData.title]);

  const handleNavigate = () => {
    if (!success && !loading) navigate(`/get-idea/${cardData._id}`);
  };
  const handleDelete = async () => {
    try {
      await handleDeleteIdea(cardData._id);
      setIsMenuOpen(false);
      setTimeout(() => {
        refresh(searchParams.get("q") ?? "");
      }, 500);
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  return (
    <div
      className={`idea-card relative p-4 border rounded-lg shadow-md bg-[#1F1E25] text-gray-100 overflow-hidden ${
        isMenuOpen ? "border-b-yellow-400" : ""
      } `}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
        className="absolute z-10 top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full"
        ref={buttonRef}
      >
        <img src="/assets/options.svg" alt="Options" className="w-6 h-6" />
      </button>

      <div
        className={`options ${!isMenuOpen ? "hide_options" : ""}`}
        ref={optionCardRef}
      >
        <span onClick={() => openDialog()}>Edit</span>
        <span onClick={() => handleDelete()}>Delete</span>
      </div>

      <div
        className="text-center text-nowrap text-xl font-semibold mb-2 w-[90%] markdownPreview text-container"
        dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
      ></div>

      <div className="flex flex-col gap-2 justify-between text-sm text-gray-400">
        <span className="font-semibold">
          Created: {new Date(cardData.createdAt).toLocaleDateString()}
        </span>
        <span className="font-semibold">
          Updated: {new Date(cardData.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Clickable card area */}
      <div
        className={`flex justify-center w-full h-full absolute inset-0 cursor-pointer ${
          loading || success ? "bg-black bg-opacity-50 z-[100]" : ""
        }`}
        onClick={handleNavigate}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : success ? (
          <img
            src={"/assets/checkmark.svg"}
            width={32}
            height={32}
            alt="Idea Created"
            className="flex justify-between w-max h-max m-auto"
          />
        ) : (
          ""
        )}
      </div>
      <DialogPanel
        isOpen={isDialogOpen}
        onClose={closeDialog}
        cardData={{ ...cardData }}
      />
      {error && (
        <p className="m-auto text-red-600 font-semibold text-xl mt-4 w-[75%] overflow-hidden text-overflow-ellipsis whitespace-normal break-words">
          {error?.message}
        </p>
      )}
    </div>
  );
};

export default IdeaCard;

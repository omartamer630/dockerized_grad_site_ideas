import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { EditIdeaProps, NewIdeaProps } from "../../types";
import { useAddIdea, useEditIdea } from "../../hooks";
import {
  getEditIdeaSchema,
  getIdeSchema,
  validateWithSchema,
} from "../../utils";
import { ZodError } from "zod";
import { Link } from "react-router-dom";

const NewIdea: React.FC<EditIdeaProps> = ({ cardData }) => {
  const [data, setData] = useState<NewIdeaProps>({
    title: cardData?.title ?? "",
    content: cardData?.content ?? "",
  });

  const schema = getIdeSchema();

  const editSchema = getEditIdeaSchema(
    cardData?.title ?? "",
    cardData?.content ?? ""
  );
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const ideaRef = useRef<HTMLTextAreaElement>(null);

  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [sanitizedTitle, setSanitizedTitle] = useState<string>("");

  const { success, error: ApiError, loading, handleAddIdea } = useAddIdea(data);
  const {
    success: editSuccess,
    error: EditApiError,
    loading: editLoading,
    handleEditIdea,
  } = useEditIdea();

  useEffect(() => {
    const convertAndSanitizeContent = async () => {
      const rawHtml = await marked(data.content);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setSanitizedContent(sanitizedHtml);
    };
    const convertAndSanitizeTitle = async () => {
      const rawHtml = await marked(data.title);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setSanitizedTitle(sanitizedHtml);
    };
    convertAndSanitizeContent();
    convertAndSanitizeTitle();
  }, [data.content, data.title]);

  useEffect(() => {
    const textarea = ideaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [data.content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    if (!cardData) {
      try {
        schema.parse(data);
        await handleAddIdea();
      } catch (error) {
        if (error instanceof ZodError) {
          setErrors(validateWithSchema(error));
        } else {
          console.error("An unexpected error occurred:", error);
          setErrors({ message: "An unexpected error occurred." });
        }
      }
    } else {
      try {
        editSchema.parse(data);
        await handleEditIdea(cardData?._id, data);
      } catch (error) {
        if (error instanceof ZodError) {
          console.log(validateWithSchema(error));
          setErrors(validateWithSchema(error));
        } else {
          console.error("An unexpected error occurred:", error);
          setErrors({ message: "An unexpected error occurred." });
        }
      }
    }
  };

  return (
    <div className="flex items-center flex-col w-full h-full px-4 my-8">
      {/* Form Section */}
      <div className="flex gap-2 text-xl sm:text-3xl md:text-5xl font-semibold">
        <Link
          to="https://www.markdownguide.org/basic-syntax"
          className="font-extrabold border-b-4 hover:border-b-blue-600 rounded-lg border-b-blue-600 2xl:border-b-white"
        >
          Markdown
        </Link>
        Syntax is Supported
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-8 my-16 md:justify-between items-center w-full">
        <form
          className="flex flex-col md:flex-1 gap-6 p-6 rounded-lg shadow-md bg-[#1F1E25] "
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            handleSubmit(e);
          }}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            {cardData ? "Edit" : "Create"} Your Idea
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Idea"
              value={data.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={`${
                errors?.title ||
                errors?.titleOrContent ||
                ApiError?.title ||
                ApiError?.titleOrContent
                  ? "error_border"
                  : ""
              }`}
            />
            {(ApiError?.title || errors?.title) && (
              <div className="text-red-500 text-sm">
                {ApiError?.title || errors?.title}
              </div>
            )}
            <textarea
              value={data.content}
              placeholder="Details About Your Idea"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setData((prev) => ({ ...prev, content: e.target.value }))
              }
              className={`${
                ApiError?.content ||
                errors?.content ||
                errors?.titleOrContent ||
                EditApiError?.titleOrContent
                  ? "error_border"
                  : ""
              }`}
              ref={ideaRef}
            />
            {(ApiError?.content || errors?.content) && (
              <div className="text-red-500 text-sm">
                {ApiError?.content || errors?.content}
              </div>
            )}
          </div>
          <div
            className={`flex items-center rounded-lg   text-white  ${
              loading || editLoading || success || editSuccess
                ? ""
                : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            {loading || editLoading ? (
              <div className="flex w-full h-full justify-center items-center">
                <span className="loading loading-spinner"></span>
              </div>
            ) : success || editSuccess ? (
              <img
                src={"/assets/checkmark.svg"}
                width={32}
                height={32}
                alt="Idea Created"
                className="flex justify-between w-max h-max m-auto"
              />
            ) : (
              <button
                type={success || editSuccess ? "button" : "submit"}
                className="flex justify-center items-center py-2 font-semibold w-full  rounded-lg transition-all text-2xl"
              >
                {cardData ? "Edit" : "Submit"}
              </button>
            )}
          </div>
          {(ApiError?.message ||
            errors?.message ||
            errors?.titleOrContent ||
            EditApiError?.titleOrContent) && (
            <div className="m-auto font-semibold  text-red-500 ">
              {ApiError?.message ??
                errors?.message ??
                errors?.titleOrContent ??
                EditApiError?.titleOrContent}
            </div>
          )}
        </form>

        {/* Preview Section */}
        <div className="flex md:flex-1 flex-col gap-6 p-6 rounded-lg shadow-md overflow-hidden bg-[#1F1E25] max-w-[100%]">
          {/* Title Preview */}
          <div className="rounded-md p-4 bg-[#2B2A33] shadow-md">
            <h2 className="text-xl font-bold text-gray-100 mb-2">
              Title Preview
            </h2>
            <div
              className="markdownPreview text-gray-300"
              dangerouslySetInnerHTML={{
                __html: sanitizedTitle || "Your title will appear here",
              }}
            />
          </div>

          {/* Content Preview */}
          <div className="rounded-md p-4 bg-[#2B2A33] shadow-md">
            <h2 className="text-xl font-bold text-gray-100 mb-2">
              Content Preview
            </h2>
            <div
              className="markdownPreview text-gray-300"
              dangerouslySetInnerHTML={{
                __html: sanitizedContent || "Details will appear here",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewIdea;

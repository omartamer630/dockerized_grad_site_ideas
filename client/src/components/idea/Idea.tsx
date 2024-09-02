import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetIdea } from "../../hooks";
import IdeaNotFound from "./IdeaNotFound";

const Idea = () => {
  const { id } = useParams();
  const { data, loading, error, handleGetIdea } = useGetIdea(id ?? "0");

  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [sanitizedTitle, setSanitizedTitle] = useState<string>("");

  useEffect(() => {
    const convertAndSanitize = async () => {
      if (data) {
        const rawTitle = await marked(data.title ?? "No Title");
        const sanitizedTitle = DOMPurify.sanitize(rawTitle);
        setSanitizedTitle(sanitizedTitle);

        const rawContent = await marked(data.content ?? "No Content");
        const sanitizedContent = DOMPurify.sanitize(rawContent);
        setSanitizedContent(sanitizedContent);
      }
    };

    convertAndSanitize();
  }, [data, handleGetIdea]);

  useEffect(() => {
    if (id) {
      handleGetIdea();
    }
  }, [id, handleGetIdea]);

  if (loading) {
    return (
      <div className="flex w-full h-full  justify-center items-center">
        <span className="loading loading-ring w-[150px]"></span>
      </div>
    );
  }

  if (!id || error) {
    return <IdeaNotFound />;
  }

  return (
    <div className="flex flex-col gap-20 items-center w-full my-10 px-6">
      <div
        className="markdownPreview"
        dangerouslySetInnerHTML={{
          __html: sanitizedTitle || "Title not available",
        }}
      ></div>
      <div className="flex flex-col gap-2 justify-start mr-auto mb-10 text-sm text-gray-400">
        <span className="font-extrabold">
          Created: {new Date(data?.createdAt as Date).toLocaleDateString()}
        </span>
        <span className="font-extrabold">
          Updated: {new Date(data?.updatedAt as Date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex w-full">
        <div
          className="markdownPreview"
          dangerouslySetInnerHTML={{
            __html: sanitizedContent || "Content not available",
          }}
        />
      </div>
    </div>
  );
};

export default Idea;

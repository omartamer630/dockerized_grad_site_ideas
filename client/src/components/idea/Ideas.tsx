import { useCallback, useEffect, useMemo } from "react";
import { useGetIdeas } from "../../hooks";
import { IdeaCard } from "../index";
import { useSearchParams } from "react-router-dom";

const Ideas = () => {
  const { error, loading, handleGetIdeas, data } = useGetIdeas();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  console.log(data);
  useEffect(() => {
    handleGetIdeas(q ?? "");
  }, [handleGetIdeas, q]);

  const refresh = useCallback(
    async (q: string) => {
      await handleGetIdeas(q ?? "");
    },
    [handleGetIdeas]
  );
  const ideas = useMemo(() => {
    return data && data.ideas && data.ideas.length > 0 ? (
      <div className="flex flex-wrap justify-center gap-8 mt-6 overflow-hidden w-[75%]">
        {data.ideas.map((idea) => (
          <IdeaCard key={idea._id} cardData={{ ...idea }} refresh={refresh} />
        ))}
      </div>
    ) : error ? (
      <div>
        <div className="text-center text-2xl text-red-500">{error.message}</div>
      </div>
    ) : (
      <div className="font-semibold text-5xl mt-6">{data?.message}</div>
    );
  }, [data, error, refresh]);

  if (loading) {
    return (
      <div className="flex w-full h-full mt-32 justify-center items-center">
        <span className="loading loading-ring  w-[150px]"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <h1 className="shine text-5xl font-semibold font-serif  my-5 ">
        All Ideas
      </h1>
      {ideas}
    </div>
  );
};

export default Ideas;

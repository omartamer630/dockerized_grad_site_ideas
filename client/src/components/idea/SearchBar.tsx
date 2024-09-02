import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("q", data.trim());

    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="min-w-[400px]"
          type="text"
          placeholder="Search Ideas..."
          value={data}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData(e.target.value)
          }
        />
      </form>
    </div>
  );
};

export default SearchBar;

import { SearchBar, Ideas } from "./index";

const Home = () => {
  return (
    <div className="flex gap-5 flex-col justify-center items-center my-10">
      <SearchBar />
      <Ideas />
    </div>
  );
};

export default Home;

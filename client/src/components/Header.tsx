
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex text-xl justify-between items-center p-4  bg-[#191E24]">
      <h1 className="font-extrabold text-base sm:text-3xl md:text-4xl bg-transparent">
        Start Adding Your Ideas
      </h1>
      <div className="flex gap-4">
        <Link
          className="flex items-center font-extrabold text-white btn bg-[#14191E] 2xl:bg-transparent"
          to="/idea/new"
        >
          New Idea
        </Link>
        <Link
          className="flex items-center font-extrabold text-white btn bg-[#14191E] 2xl:bg-transparent"
          to="/"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Header;

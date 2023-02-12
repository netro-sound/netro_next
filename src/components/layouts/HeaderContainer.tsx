import { RiSearch2Line } from 'react-icons/ri';

type Props = {};

export default function HeaderContainer({}: Props) {
  return (
    <div className="fixed top-4 right-0 z-40 pl-72 pr-12 rounded-box w-screen ">
      <form className="shadow-lg">
        <label
          htmlFor="default-search"
          className="text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiSearch2Line />
          </div>
          <input
            type="search"
            id="default-search"
            className="input w-full pl-10"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2 btn btn-sm btn-primary text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

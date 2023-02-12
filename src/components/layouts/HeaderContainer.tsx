import { RiSearch2Line } from 'react-icons/ri';

type Props = { sideOpen?: boolean; closeSidebar?: (value: boolean) => void };

export default function HeaderContainer({ sideOpen, closeSidebar }: Props) {
  return (
    <div className="fixed top-4 right-0 z-20 md:pl-72 md:pr-12 px-2 rounded-box w-screen flex gap-2">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        onClick={() => (closeSidebar ? closeSidebar(!sideOpen) : null)}
        type="button"
        className="inline-flex items-center text-sm text-primary rounded-lg bg-base-100 p-3 md:hidden hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-base-100"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <form className="shadow-lg w-full">
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

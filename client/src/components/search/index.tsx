type Props = {};

const Search = (props: Props) => {
  return (
    <form className="text-base font-medium text-white laptop:w-[400px] desktop:w-[500px] flex justify-center item-center h-[42px] bg-darkslategray rounded-[5px]">
      <div className="h-full flex justify-start items-center p-2">
        <svg
          width="18"
          height="18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.875 1.5a6.375 6.375 0 103.642 11.608l3.063 3.063a1.125 1.125 0 001.59-1.591l-3.062-3.063A6.375 6.375 0 007.875 1.5zM3.75 7.875a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0z"
            fill="#94959a"
          ></path>
        </svg>
      </div>
      <div className="flex-1 h-full flex justify-start items-center">
        <input
          className="focus:outline-none focus:border-none border-none outline-none bg-transparent text-white w-full"
          type="text"
          name="search-box"
          id="search-box"
          maxLength={100}
          placeholder="搜索你感兴趣的内容"
        />
      </div>
      <button
        type="submit"
        className="opacity-80 leading-6 hover:text-red_hover hover:opacity-100 text-white px-2"
      >
        搜索
      </button>
    </form>
  );
};

export default Search;

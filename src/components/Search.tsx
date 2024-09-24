import { type ChangeEvent, useEffect, useRef } from "react";
import { TbSearch } from "react-icons/tb";

type Props = {
  value: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ value, handleOnChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative flex w-full flex-wrap items-stretch">
      <input
        ref={inputRef}
        value={value}
        onChange={handleOnChange}
        placeholder="Start typing to search..."
        className="relative m-0 block flex-auto rounded-l border border-solid border-gray-300 bg-gray-100 bg-clip-padding px-3 py-2 text-base font-normal leading-6 text-gray-900 outline-none transition duration-200 ease-in-out focus:z-10 focus:border-blue-400 focus:text-gray-900 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
        aria-label="Search"
      />
      <span className="input-group-text flex items-center whitespace-nowrap rounded-r px-3 py-2 text-center text-base font-normal text-gray-600 bg-gray-200">
        <TbSearch className="h-5 w-5" />
      </span>
    </div>
  );
}

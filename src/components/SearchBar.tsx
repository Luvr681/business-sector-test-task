import { useAppSelector, useAppDispatch } from '../hooks/storeHooks';

import { setSearchString } from '../store/searchString';
import { RootState } from '../store';

import { SearchIcon } from "./icons/SearchIcon";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const searchString = useAppSelector((state: RootState) => state.searchString.searchString);

  const searchHandler = (e: any) => {
    dispatch(setSearchString(e.target.value));
  }

  return (
    <div className="bg-[#5A5C66] w-full md:w-1/2 my-4 px-7 py-5 flex items-center justify-between">
      <input
        placeholder="Поиск"
        className="bg-inherit w-11/12 text-white"
        value={searchString}
        onChange={searchHandler}
      />
      <SearchIcon />
    </div>
  );
}

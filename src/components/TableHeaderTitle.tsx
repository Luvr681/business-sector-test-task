import { ArrowIcon } from "./icons/Arrow";
import { config } from "../config.d";
import { useEffect, useState } from "react";

interface IProps {
  keyTitlePair: { key: string, title: string };
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  activeIcon: string;
  setActiveIcon: React.Dispatch<React.SetStateAction<string>>;
}

export function TableHeaderTitle({ keyTitlePair, setSortBy, activeIcon, setActiveIcon }: IProps) {
  const { key, title } = keyTitlePair;
  const [rotated, setRotated] = useState<boolean>(false);

  useEffect(() => {
    setRotated(key === activeIcon);
  }, [activeIcon]);

  const clickHandler = () => {
    setActiveIcon(key);
    setSortBy(rotated ? config.defaultSortKey : key);
    setRotated(!rotated);
  }

  return (
    <th onClick={clickHandler} className={`md:p-6 p-2 cursor-pointer ${title === 'ID' ? 'md:w-1/12 w-1/4' : 'w-2/5'}`} scope="col">
      <div className="flex items-center justify-center font-semibold">
        <p className="mr-11">{title}</p>
        <ArrowIcon rotated={rotated} />
      </div>
    </th>
  );
}

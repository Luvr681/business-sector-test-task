import { config } from "../config.d";

interface IResult {
  min: number;
  max: number;
}

export function defineNavBarLimits(postPageCount: number, maxPagesCount: number): IResult {
  const halfNavBarPageButtonsCount = Math.floor(config.maxNavBarPageButtonsCount / 2);
  const navBarLimits = {
    min: +postPageCount - halfNavBarPageButtonsCount - 1,
    max: +postPageCount + halfNavBarPageButtonsCount
  }

  if (+postPageCount - halfNavBarPageButtonsCount <= 0) {
    navBarLimits.min = config.defaultNavigationMin;
    navBarLimits.max = Math.min(navBarLimits.min + config.maxNavBarPageButtonsCount, maxPagesCount);
    return navBarLimits;
  }
  if (+postPageCount + halfNavBarPageButtonsCount > maxPagesCount) {
    navBarLimits.max = maxPagesCount;
    navBarLimits.min = navBarLimits.max - config.maxNavBarPageButtonsCount;
    return navBarLimits;
  }

  return navBarLimits;
}

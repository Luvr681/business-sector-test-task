import { useAppSelector } from '../hooks/storeHooks';
import { RootState } from '../store';
import { config } from '../config.d';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { filterPostsBy } from '../lib/filterPostsBy';
import { INavigationLimits, IPost } from '../types';
import { defineNavBarLimits } from '../lib/defineNavBarLimits';

interface IProps {
  navigationLimits: INavigationLimits;
  setNavigationLimits: React.Dispatch<React.SetStateAction<INavigationLimits>>;
}

export function NavBar({ navigationLimits, setNavigationLimits }: IProps) {
  const postPageCount = useParams().postPageCount || 0;
  const [posts, searchString] = useAppSelector((state: RootState) => {
    return [state.posts.posts, state.searchString.searchString]
  });
  const [shownPosts, setShownPosts] = useState<IPost[]>(posts);
  const [maxPagesCount, setMaxPagesCount] = useState<number>(Math.ceil(shownPosts.length / config.maxPostsQuantity || 1));

  useEffect(() => {
    const filteredPosts = posts.filter(post => filterPostsBy(post, searchString.trim()));

    setShownPosts(filteredPosts);
    setMaxPagesCount(Math.ceil(filteredPosts.length / config.maxPostsQuantity || 1));
  }, [posts, searchString]);

  useEffect(() => {
    setNavigationLimits(defineNavBarLimits(+postPageCount, maxPagesCount));
  }, [postPageCount, shownPosts]);

  return (
    <div className='flex items-center justify-between w-11/12 mx-auto py-4 px-4'>
      <Link to={'/' + Math.max((+postPageCount - 1), 1)} className='text-3xl font-semibold'>Назад</Link>
      <div className='flex items-center justify-center'>
        {
          Array(maxPagesCount)
            .fill(0)
            .map((_, idx) => idx + 1)
            .slice(navigationLimits.min, navigationLimits.max)
            .map(pageCount => {
              return (
                <Link
                  key={pageCount}
                  className={`mr-4 font-bold italic text-lg color-${pageCount === +postPageCount ? "green" : "gray"}`}
                  to={'/' + pageCount}>
                  {pageCount}
                </Link>
              );
            })
        }
      </div>
      <Link to={'/' + Math.min((+postPageCount + 1), maxPagesCount)} className='text-3xl font-semibold'>Далее</Link>
    </div>
  );
}

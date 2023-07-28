import { useEffect, useState } from 'react';

import { Table } from "../components/Table";
import { SearchBar } from '../components/SearchBar';
import { NavBar } from '../components/NavBar';

import { useAppDispatch } from '../hooks/storeHooks';

import { setPosts } from '../store/posts';

import { sortPostsBy } from '../lib/sortPostsBy';

import { config } from '../config.d';

import { INavigationLimits, IPost, KeysMatching } from '../types';

export function Home() {
  const dispatch = useAppDispatch();
  const [navigationLimits, setNavigationLimits] = useState<INavigationLimits>({
    min: config.defaultNavigationMin,
    max: config.defaultNavigationMax
  });

  useEffect(() => {
    try {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(data => data.json())
        .then(posts => {
          if (posts.length) {
            dispatch(setPosts(sortPostsBy(posts, config.defaultSortKey as KeysMatching<IPost, string>)));
          }
        });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className='w-full md:p-0 md:w-11/12 mx-auto p-2'>
      <SearchBar />
      <Table />
      <NavBar navigationLimits={navigationLimits} setNavigationLimits={setNavigationLimits} />
    </div>
  );
}

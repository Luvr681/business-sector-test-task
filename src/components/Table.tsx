import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { RootState } from '../store';
import { IPost, KeysMatching } from '../types';
import { Post } from './Post';
import { TableHeaderTitle } from './TableHeaderTitle';

import { config } from '../config.d';
import { useParams } from 'react-router-dom';
import { filterPostsBy } from '../lib/filterPostsBy';
import { sortPosts } from '../store/posts';


export function Table() {
  const [activeTableHeaderTitleIcon, setActiveTableHeaderTitleIcon] = useState<string>('');
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<string>(config.defaultSortKey);
  const [shownPosts, setShownPosts] = useState<IPost[]>([]);
  const [posts, searchString] = useAppSelector((state: RootState) => [state.posts.posts, state.searchString.searchString]);
  const postPageCount = useParams().postPageCount || 0;
  const tableHeaderKeyTitlePairs: { key: string, title: string }[] = [
    {
      key: 'id',
      title: 'ID'
    },
    {
      key: 'title',
      title: 'Заголовок'
    },
    {
      key: 'body',
      title: 'Описание'
    },
  ];

  useEffect(() => {
    const startIdx = (+postPageCount - 1) * config.maxPostsQuantity;
    const quantity = +postPageCount * config.maxPostsQuantity;

    setShownPosts(posts
      .filter(post => filterPostsBy(post, searchString.trim()))
      .slice(startIdx, quantity));

  }, [postPageCount, posts, searchString]);

  useEffect(() => {
    dispatch(sortPosts(sortBy as KeysMatching<IPost, string>));
  }, [sortBy]);

  return (
    <table className="w-full table-fixed">
      <thead className='bg-[#474955] text-white w-full'>
        <tr className='w-11/12 md:w-full'>
          {
            tableHeaderKeyTitlePairs.length && tableHeaderKeyTitlePairs.map((keyTitlePair, idx) => {
              return <TableHeaderTitle
                activeIcon={activeTableHeaderTitleIcon}
                setActiveIcon={setActiveTableHeaderTitleIcon}
                setSortBy={setSortBy}
                keyTitlePair={keyTitlePair}
                key={idx}
              />;
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          shownPosts.length && shownPosts.map((post, idx) => {
            return <Post post={post} key={idx} />
          })
        }
      </tbody>
    </table>
  );
}

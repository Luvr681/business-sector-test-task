import { IPost, KeysMatching } from "../types";

export function sortPostsBy(posts: IPost[], sortBy: KeysMatching<IPost, string>) {
  return posts.sort((postA, postB) => {
    return postA[sortBy] > postB[sortBy] ? -1 : postA[sortBy] < postB[sortBy] ? 1 : 0;
  });
}

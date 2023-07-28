import { IPost } from "../types";

export function filterPostsBy(post: IPost, filterBy: string) {
  const { title, body, id } = post;
  return isInclude(body, filterBy) || isInclude(title, filterBy) || isInclude(id, filterBy);
}

function isInclude(source: any, value: string) {
  return source.toString().toLowerCase().includes(value.toLowerCase());
}


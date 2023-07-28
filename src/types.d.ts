export type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

export const PostSortKeys: KeysMatching<IPost, string>[] = [
  'id', 'title', 'body'
];

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface IConfig {
  maxPostsQuantity: number;
  maxNavBarPageButtonsCount: number;
  defaultSortKey: string;
  defaultNavigationMin: number;
  defaultNavigationMax: number;
}

export interface INavigationLimits {
  min: number;
  max: number;
}

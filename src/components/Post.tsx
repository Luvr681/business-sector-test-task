import { IPost } from "../types";

interface IProps {
  post: IPost
}

export function Post({ post }: IProps) {
  return (
    <tr>
      <th className="font-normal md:font-medium p-2 md:p-4 border border-[#E3E6EC]">{post.id}</th>
      <td className="font-normal w-1/3 md:font-medium p-2 md:p-4 border border-[#E3E6EC]">{post.title}</td>
      <td className="font-normal w-1/3 md:font-medium p-2 md:p-4 border border-[#E3E6EC]">{post.body}</td>
    </tr>
  );
}

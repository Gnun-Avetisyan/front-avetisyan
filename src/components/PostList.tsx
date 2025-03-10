import { TPostsData } from "../types";
import PostCard from "./Post";

interface IProps {
  posts: TPostsData;
}

const PostList = ({ posts }: IProps) => {
  return (
    <div className="container">
      <div className="post-list">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;

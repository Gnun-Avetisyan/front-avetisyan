import { TPost } from "../types";

interface IProps {
  post: TPost;
}

const PostCard = ({ post }: IProps) => {
  return (
    <div className="post-card">
      <img
        src={post.img}
        srcSet={`${post.img_2x} 2x`}
        alt={post.title}
        className="post-image"
      />
      <div className="post-content">
        <p className="post-tag">{post.tags}</p>
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta">
          <span>{post.autor}</span>
          <span>
            • {post.date} • {post.views} Views
          </span>
        </div>
        <p className="post-text">{post.text}</p>
      </div>
    </div>
  );
};

export default PostCard;

import { useCallback, useEffect, useState, useTransition } from "react";
import fetchHttp from "../api";
import { HTTPMethods, TPostsData } from "../types";
import PostList from "../components/PostList";
import Navbar from "../components/Header";

const Index = () => {
  const [posts, setPosts] = useState<TPostsData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<TPostsData>([]);
  const [isPending, startTransition] = useTransition();
  const [showSearch, setShowSearch] = useState<boolean>(false); // Manage input visibility


  const getPostsData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchHttp<TPostsData>(HTTPMethods.GET);
      setPosts(response);
      setFilteredPosts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPostsData();
  }, [getPostsData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        const filtered = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.text.toLowerCase().includes(searchTerm)
        );
        setFilteredPosts(filtered);
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, posts]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Navbar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      {isPending ? (
        <h2>Filtering...</h2>
      ) : filteredPosts.length === 0 ? (
        <h2>No posts found.</h2>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
}

export default Index;
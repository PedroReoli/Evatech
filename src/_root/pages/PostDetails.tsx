// Importing necessary modules and components from libraries and local files
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared";
import GridPostList from "@/components/shared/GridPostList";
import PostStats from "@/components/shared/PostStats";
import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { appwriteConfig } from "@/lib/appwrite/config";
import { useState, useEffect } from "react";

// PostDetails component definition
const PostDetails = () => {
  // Navigation hook
  const navigate = useNavigate();
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();
  // Getting the current user from the user context
  const { user } = useUserContext();
  // State to store file ID
  const [fileId, setFileId] = useState('');

  // Fetching the post data by its ID
  const { data: post, isLoading } = useGetPostById(id);
  // Fetching posts created by the same user
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  // Hook to handle the delete post mutation
  const { mutate: deletePost } = useDeletePost();

  // Filtering related posts, excluding the current post
  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  // Effect to set file ID when post data is available
  useEffect(() => {
    if (post) {
      setFileId(post.imageId);
    }
  }, [post]);

  // Handler function to delete the post
  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1); // Navigate back to the previous page
  };

  // Constructing the file URL for download
  const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.storageId}/files/${fileId}/view?project=${appwriteConfig.projectId}&mode=admin`;

  // Render the component
  return (
    <div className="post_details-container">
      {/* Back button for navigation */}
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Voltar</p>
        </Button>
      </div>

      {/* Show loader while post data is loading */}
      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              {/* Link to the creator's profile */}
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3 ">
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full "
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-black">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                {/* Edit post link, shown only to the creator */}
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                {/* Delete post button, shown only to the creator */}
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`post_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-purple-1" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between w-full mt-4">
              {/* Displaying post statistics */}
              <PostStats post={post} userId={user.id} />
              <Button
                type="button"
                size="sm"
                className="shad-button_primary px-5"
                onClick={() => window.open(fileUrl, '_blank')}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-purple-1" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          Mais Conteudo
        </h3>
        {/* Show loader while related posts are loading */}
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

// Exporting PostDetails component as default
export default PostDetails;

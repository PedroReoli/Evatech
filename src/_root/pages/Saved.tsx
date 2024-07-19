// Importing necessary modules and components from libraries and local files
import { Models } from "appwrite";
import { Loader } from "@/components/shared";
import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queries";

// Saved component definition
const Saved = () => {
  // Fetching the current user data using a custom hook
  const { data: currentUser } = useGetCurrentUser();

  // Mapping through the saved posts of the current user and reversing the order
  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  // Render the Saved component
  return (
    <div className="saved-container bg-background-home">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Materiais Concluídos</h2>
      </div>

      {/* Show loader if current user data is not available yet */}
      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {/* Show message if no posts are saved, otherwise display the saved posts */}
          {savePosts.length === 0 ? (
            <p className="text-light-4">Não concluiu nenhum material? Vamos lá !!!</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

// Exporting Saved component as default
export default Saved;

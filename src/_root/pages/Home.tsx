// Importing required modules and components
import { Models } from "appwrite";
import { useState } from 'react';
import { Input } from "@/components/ui/input";

// import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import PostCard from "@/components/shared/PostCard"; 
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

// Home component definition
const Home = () => {
  // Commented out toast for notifications
  // const { toast } = useToast();

  // Fetching recent posts data using custom hook
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  // Fetching users data using custom hook with a limit of 10
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);
  
  // State to manage the search term for filtering users
  const [termoDePesquisa, setTermoDePesquisa] = useState('');

  // Filtering creators based on the search term
  const criadoresFiltrados = creators?.documents.filter((creator) =>
    (creator.username?.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
    creator.name?.toLowerCase().includes(termoDePesquisa.toLowerCase()))
  ) || [];

  // Handling errors for posts or creators
  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  // Main return for the Home component
  return (
    <div className="flex flex-1">
      {/* Home container with background */}
      <div className="home-container bg-background-home ">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Mural</h2>
          {isPostLoading && !posts ? (
            // Loader shown while posts are loading
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  {/* Displaying each post using PostCard component */}
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators bg-background-users">
        <h3 className="h3-bold text-black">Familia Evatech</h3>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4 explore-father-search">
          <img
            width={24}
            src="/assets/icons/search.svg"
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Pesquisar usuário"
            className="explore-search"
            value={termoDePesquisa}
            onChange={(event) => setTermoDePesquisa(event.target.value)}
          />
        </div>
        {isUserLoading && !creators ? (
          // Loader shown while users are loading
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {criadoresFiltrados.map((creator) => (
              <li key={creator?.$id}>
                {/* Displaying each creator using UserCard component */}
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Exporting Home component as default
export default Home;
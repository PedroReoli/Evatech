import { Models } from "appwrite";
import { useState } from 'react';
import { Input } from "@/components/ui/input";

// import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import  PostCard  from "@/components/shared/PostCard";
import  UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";


const Home = () => {
  // const { toast } = useToast();

  
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);
  
  const [termoDePesquisa, setTermoDePesquisa] = useState('');

  const criadoresFiltrados = creators?.documents.filter((creator) =>
    (creator.username?.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
    creator.name?.toLowerCase().includes(termoDePesquisa.toLowerCase()))
  ) || [];
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

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
          <h3 className="h3-bold text-light-1">Peoples do Mês</h3>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
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
          <Loader />
          
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {criadoresFiltrados.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;

// Importing necessary modules and components from libraries and local files
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queries";

// AllUsers component definition
const AllUsers = () => {
  const { toast } = useToast(); // Hook for displaying toast notifications
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  // Fetching the users data using a custom hook
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  // Display an error message if there is an error fetching the users
  if (isErrorCreators) {
    toast({ title: "Algo deu errado :( " });
    return;
  }

  // Filtering users based on the search term
  const filteredUsers = creators?.documents.filter((creator) =>
    (creator.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  // Render the AllUsers component
  return (
    <div className="common-container bg-background-home">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Da nossa família</h2>
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
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        {/* Show loader while users data is loading */}
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {/* Display the filtered users */}
            {filteredUsers.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Exporting AllUsers component as default
export default AllUsers;

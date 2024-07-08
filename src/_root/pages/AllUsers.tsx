import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Algo deu errado :( " });
    return;
  }

  const filteredUsers = creators?.documents.filter((creator) =>
    (creator.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">People</h2>
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
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {filteredUsers.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;

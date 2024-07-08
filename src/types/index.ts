export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};
export type INewEvent = {
  userId: string;
  title: string;
  description: string;
  date: Date;
  location: string;
 
};

export type IUpdateEvent = {
  eventId: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  participants: string[]; // Você pode ajustar o tipo conforme necessário
  // Atualize outros atributos do evento conforme necessário
};

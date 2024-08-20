interface NavLink {
  imgURL: string;
  route: string;
  label: string;
}

export const sidebarLinks: NavLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Início",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "Participantes",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Material",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Concluído",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Postar",
  },
];

export const bottombarLinks: NavLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Início",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "Participantes",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Material",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Concluído",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Postar",
  },
];
// Polirmofismo paramétrico
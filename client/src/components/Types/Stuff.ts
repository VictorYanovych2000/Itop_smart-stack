export type StuffT = {
  number: number;
  id: number;
  name: string;
  email: string;
  role: string;
  phone: number;
  rooms?: [
    {
      id: string;
      ownerId: string;
      ownerName: string;
      name: string;
      statusAlert?: {
        color: string;
        id: string;
        status: string;
      };
    }
  ];
};

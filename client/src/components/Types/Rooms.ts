export interface IStatusAlert {
  color: string;
  id: string;
  status: string;
}

export interface IRooms {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  statusAlert?: IStatusAlert;
}

export interface getRooms {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  statusAlert: IStatusAlert;
}

export interface IRoomsDrag {
  getRooms: getRooms[];
}

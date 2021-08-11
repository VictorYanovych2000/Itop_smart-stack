let users = [
  {
    id: 1,
    name: "Who",
    role: "Doctor",
    email: "doctor@gmail.com",
    phone: 380973788860,
  },
  {
    id: 2,
    name: "Watson",
    role: "Assistant",
    email: "assistant@gmail.com",
    phone: 380953588850,
  },
  {
    id: 3,
    name: "Ray",
    role: "Receptionist",
    email: "recep@gmail.com",
    phone: 380673722260,
  },
  {
    id: 4,
    name: "Mister",
    role: "Doctor",
    email: "doctor2@gmail.com",
    phone: 380753788866,
  },
  {
    id: 5,
    name: "Helper",
    role: "Receptionist",
    email: "recep2@gmail.com",
    phone: 380963728269,
  },
];

let alerts = [
  {
    id: 1,
    status: "Doctor required",
    color: "#63BFF230",
  },
  {
    id: 2,
    status: "Patient in",
    color: "#FA700C30",
  },
  {
    id: 3,
    status: "Assistant in",
    color: "#F2D77530",
  },
  {
    id: 4,
    status: "Emergency",
    color: "#FC666630",
  },
  {
    id: 5,
    status: "Empty",
    color: "#F0F0F0",
  },
];

let rooms = [
  {
    id: 1,
    name: "1a",
    ownerId: "1",
    ownerName: "Who",
    statusAlert: { id: 5, status: "Empty", color: "#F0F0F0" },
  },
  {
    id: 2,
    name: "2b",
    ownerId: "4",
    ownerName: "Mister",
    statusAlert: { id: 5, status: "Empty", color: "#F0F0F0" },
  },
  {
    id: 3,
    name: "2g",
    ownerId: "4",
    ownerName: "Mister",
    statusAlert: { id: 5, status: "Empty", color: "#F0F0F0" },
  },
];

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getByRole: (_: void, params: { role: string }) => {
      return users.filter((user) => user.role === params.role);
    },
    getDoctors: () => {
      return users.filter((user) => user.role === "Doctor");
    },
    getRooms: () => {
      return rooms;
    },
    getAlerts: () => {
      return alerts;
    },
  },
  Mutation: {
    createAlert: (_: void, args: { color: string; status: string }) => {
      const { color, status } = args;
      alerts.push({ ...args, id: Date.now() });
      return args;
    },
    editAlert: (
      _: void,
      args: { id: number; color: string; status: string }
    ) => {
      const { id, color, status } = args;
      alerts = alerts.map((obj) =>
        obj.id === +id ? { id: +id, status, color } : obj
      );
      return args;
    },
    createRoom: (_: void, args: any) => {
      const { name } = args;
      rooms.push({
        ...args,
        id: Date.now(),
        statusAlert: { id: 5, status: "Empty", color: "#E5E4E2" },
      });
      return args;
    },
    editRoom: (
      _: void,
      args: { id: number; name: string; ownerId: string; ownerName: string }
    ) => {
      const { id, name, ownerId, ownerName } = args;
      rooms = rooms.map((obj) =>
        obj.id === +id ? { ...obj, id: +id, name, ownerId, ownerName } : obj
      );
      return args;
    },
    deleteRoom: (_: void, args: { id: number }) => {
      const { id } = args;
      rooms = rooms.filter((obj) => +obj.id !== +id);
      return args;
    },
    setRoomOwner: (
      _: void,
      args: { id: number; ownerId: string; ownerName: string }
    ) => {
      const { id, ownerId, ownerName } = args;
      rooms = rooms.map((obj) =>
        obj.id === +id ? { ...obj, id: +id, ownerId, ownerName } : obj
      );
      return args;
    },
    nullRoomOwner: (
      _: void,
      args: { id: number; ownerId: string; ownerName: string }
    ) => {
      const { id } = args;
      rooms = rooms.map((obj) =>
        obj.id === +id ? { ...obj, id: +id, ownerId: "", ownerName: "" } : obj
      );
      return args;
    },

    createUser: (
      _: void,
      args: { name: string; role: string; email: string; phone: number }
    ) => {
      users.push({ ...args, id: Date.now() });
      return args;
    },
    editUser: (
      _: void,
      args: {
        id: number;
        name: string;
        role: string;
        email: string;
        phone: number;
      }
    ) => {
      const { id, name, role, email, phone } = args;
      users = users.map((obj) =>
        obj.id === +id ? { id: +id, name, role, email, phone } : obj
      );
      return args;
    },
    deleteUser: (_: void, args: { id: number }) => {
      const { id } = args;
      users = users.filter((obj) => +obj.id !== +id);
      rooms = rooms.map((obj) =>
        +obj.ownerId === +id ? { ...obj, ownerName: "", ownerId: "" } : obj
      );
      return args;
    },
    setAlert: (
      _: void,
      args: {
        roomId: number;
        alert: { id: number; status: string; color: string };
      }
    ) => {
      const { roomId, alert } = args;
      rooms = rooms.map((obj) =>
        +obj.id === +roomId ? { ...obj, statusAlert: alert } : obj
      );
      return alert;
    },
  },
  User: {
    rooms: (user: any) => {
      return rooms.filter((rooms) => +rooms.ownerId === +user.id);
    },
  },
};

module.exports = resolvers;

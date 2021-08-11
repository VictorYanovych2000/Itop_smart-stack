import { gql } from "@apollo/client";
import { IRooms } from "../../components/Types/Rooms";

export type SendRoomResponse = { createRoom: [IRooms] };

export const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!) {
    createRoom(name: $name) {
      name
    }
  }
`;

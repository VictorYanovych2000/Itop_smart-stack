import { gql } from "@apollo/client";
import { IRooms } from "../../components/Types/Rooms";

export type SendEditRoomResponse = { editRoom: IRooms[] };

export const EDIT_ROOM = gql`
  mutation editRoom(
    $id: ID!
    $name: String!
    $ownerId: ID
    $ownerName: String
  ) {
    editRoom(id: $id, name: $name, ownerId: $ownerId, ownerName: $ownerName) {
      id
      name
      ownerId
      ownerName
    }
  }
`;

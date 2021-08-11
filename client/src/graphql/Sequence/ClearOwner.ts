import { gql } from "@apollo/client";
import { IRooms } from "../../components/Types/Rooms";

export type SendEditRoomResponse = { editRoom: IRooms[] };

export const CLEAR_OWNER = gql`
  mutation clearRoomOwner($id: ID!, $ownerId: ID!, $ownerName: String!) {
    nullRoomOwner(id: $id, ownerId: $ownerId, ownerName: $ownerName) {
      id
      ownerId
      ownerName
    }
  }
`;

import { gql } from "@apollo/client";
import { IRooms } from "../../components/Types/Rooms";

export type SendEditRoomResponse = { editRoom: IRooms[] };

export const SET_OWNER = gql`
  mutation setRoomOwner($id: ID!, $ownerId: ID!, $ownerName: String!) {
    setRoomOwner(id: $id, ownerId: $ownerId, ownerName: $ownerName) {
      id
      ownerId
      ownerName
    }
  }
`;

import { gql } from "@apollo/client";
import { IRooms } from "../../components/Types/Rooms";

export type SendDeleteAlertResponse = { deleteAlert: IRooms[] };

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

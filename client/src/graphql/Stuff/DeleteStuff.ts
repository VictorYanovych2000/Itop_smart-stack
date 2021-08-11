import { gql } from "@apollo/client";
import { StuffT } from "../../components/Types/Stuff";

export type SendDeleteAlertResponse = { deleteUser: StuffT[] };

export const DELETE_STUFF = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

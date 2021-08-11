import { gql } from "@apollo/client";
import { StuffT } from "../../components/Types/Stuff";

export type SendEditUserResponse = { editUser: StuffT[] };

export const EDIT_USER = gql`
  mutation editUser(
    $id: ID!
    $name: String!
    $email: String!
    $role: String!
    $phone: String!
  ) {
    editUser(id: $id, name: $name, role: $role, email: $email, phone: $phone) {
      id
      name
      role
      email
      phone
    }
  }
`;

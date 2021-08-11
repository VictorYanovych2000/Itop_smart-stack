import { gql } from "@apollo/client";
import { StuffT } from "../../components/Types/Stuff";

export type SendStuffResponse = { createStuff: StuffT[] };

export const CREATE_STUFF = gql`
  mutation createStuff(
    $name: String!
    $role: String!
    $email: String!
    $phone: String!
  ) {
    createUser(name: $name, role: $role, email: $email, phone: $phone) {
      name
      role
      email
      phone
    }
  }
`;

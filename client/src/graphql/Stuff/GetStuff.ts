import { gql } from "@apollo/client";
import { StuffT } from "../../components/Types/Stuff";

export type GetAllUsersResponse = { getUsers: StuffT[] };
export type GetByRoleResponse = { getByRole: StuffT[] };

export const GetAllUsers = gql`
  query GetAllUsers {
    getUsers {
      id
      name
      email
      role
      phone
      rooms {
        id
        name
        ownerId
        ownerName
      }
    }
  }
`;

export const GetByRole = gql`
  query getByRole($role: String!) {
    getByRole(role: $role) {
      name
      id
      email
      phone
      rooms {
        id
        name
        ownerId
        ownerName
        statusAlert {
          id
          status
          color
        }
      }
    }
  }
`;

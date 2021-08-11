import { gql } from "@apollo/client";

export type DashboardT = {
  name: string;
  id: number;
  rooms: [];
};

export type GetDoctorsResponse = { getDoctors: DashboardT[] };

export const getDoctors = gql`
  query getDoctors {
    getDoctors {
      id
      name
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

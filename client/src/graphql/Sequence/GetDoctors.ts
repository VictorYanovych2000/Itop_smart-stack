import { gql } from "@apollo/client";
import { DoctorsT } from "../../components/Types/Doctors";

export type GetDoctorsByResponse = { getDoctors: DoctorsT[] };

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
      }
    }
  }
`;

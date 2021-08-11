import { gql } from "@apollo/client";
import { SequenceT } from "../../components/Types/Sequence";

export type GetAllSequenceResponse = { getRooms: SequenceT[] } | undefined;

export const GetAllRooms = gql`
  query GetAllRooms {
    getRooms {
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
`;

import { gql } from "@apollo/client";

export type setAlertT = {
  roomId: number;
  alert: { id: number; status: string; color: string };
};

export type SendEditUserResponse = { setAlert: setAlertT[] };

export const SET_ALERT = gql`
  mutation setAlert($roomId: ID!, $id: ID!, $status: String!, $color: String!) {
    setAlert(
      roomId: $roomId
      alert: { id: $id, status: $status, color: $color }
    ) {
      id
      status
      color
    }
  }
`;

import { gql } from "@apollo/client";
import { AlertT } from "../../components/Types/Alerts";

export type SendAlertResponse = { editAlert: AlertT[] };

export const EDIT_ALERT = gql`
  mutation editAlert($id: ID!, $status: String!, $color: String!) {
    editAlert(id: $id, color: $color, status: $status) {
      id
      status
      color
    }
  }
`;

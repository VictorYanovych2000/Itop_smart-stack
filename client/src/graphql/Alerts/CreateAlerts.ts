import { gql } from "@apollo/client";
import { AlertT } from "../../components/Types/Alerts";

export type SendAlertResponse = { createAlert: AlertT[] };

export const CREATE_ALERT = gql`
  mutation createAlert($color: String!, $status: String!) {
    createAlert(color: $color, status: $status) {
      status
      color
    }
  }
`;

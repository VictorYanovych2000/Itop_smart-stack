import { gql } from "@apollo/client";
import { AlertT } from "../../components/Types/Alerts";

export type GetAllAlertsResponse = { getAlerts: AlertT[] };

export const GetAllAlerts = gql`
  query GetAllAlerts {
    getAlerts {
      id
      status
      color
    }
  }
`;

import { useQuery } from "@apollo/client";
import DashboardCard from "./DashboardCard";

import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";
import {
  GetDoctorsResponse,
  getDoctors,
} from "../../graphql/Dashboard/GetDoctors";
import "./Dashboard.scss";
import { GetByRole, GetByRoleResponse } from "../../graphql/Stuff/GetStuff";

export const Dashboard = () => {
  const { data: dataDoctors, loading: loadingDoctors } =
    useQuery<GetByRoleResponse>(GetByRole, {
      variables: { role: "Doctor" },
    });

  const { data: dataAlerts, loading: loadingAlerts } =
    useQuery<GetAllAlertsResponse>(GetAllAlerts);

  if (loadingAlerts || loadingDoctors) {
    return <span>Loading...</span>;
  }

  return (
    <div className="dashboard">
      {dataAlerts &&
        dataDoctors?.getByRole?.map((dashboard) => (
          <DashboardCard
            name={dashboard.name}
            alerts={dataAlerts.getAlerts}
            key={dashboard.id}
            rooms={dashboard.rooms}
          />
        ))}
    </div>
  );
};

export default Dashboard;

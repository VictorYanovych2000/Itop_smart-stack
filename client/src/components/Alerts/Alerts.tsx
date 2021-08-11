import { useState } from "react";
import { useQuery } from "@apollo/client";
import AlertsBlock from "./AlertsBlock";
import { ModalCreateAlert } from "./Modals/ModalCreateAlerts";

import {
  GetAllAlerts,
  GetAllAlertsResponse,
} from "../../graphql/Alerts/GetAlerts";
import "./Alerts.scss";

interface ModalCreateAlert {
  modalCreateAlerts: boolean;
  setModalCreateAlertsActive: (id: number) => void;
}

export const Alerts = () => {
  const [modalCreateAlerts, setModalCreateAlertsActive] = useState(false);
  const { data, loading } = useQuery<GetAllAlertsResponse>(GetAllAlerts);

  const toggleCreateModal = () => {
    setModalCreateAlertsActive((store) => !store);
  };

  if (loading) {
    return <span>Page is loading...</span>;
  }

  return (
    <div className="alerts">
      <button className="add" onClick={toggleCreateModal}>
        Add new
      </button>
      <div className="alerts_box">
        {data?.getAlerts &&
          data.getAlerts.map((alert, index) => (
            <AlertsBlock
              id={alert.id}
              index={index}
              status={alert.status}
              color={alert.color}
              key={alert.id}
            />
          ))}
      </div>
      {modalCreateAlerts && (
        <ModalCreateAlert
          active={modalCreateAlerts}
          setModalCreateAlertsActive={setModalCreateAlertsActive}
        ></ModalCreateAlert>
      )}
    </div>
  );
};

export default Alerts;

import { FC, useState } from "react";

import editPen from "../../img/editPen.svg";

import { AlertT } from "../../components/Types/Alerts";
import { ModalEditAlert } from "./Modals/ModalEditAlerts";
import "./AlertsBlock.scss";

export const AlertsBlock: FC<AlertT> = ({ index, status, color, id }) => {
  const [modalEditAlerts, setModalEditAlertsActive] = useState(false);

  const toggleEditModal = () => {
    setModalEditAlertsActive((store) => !store);
  };

  return (
    <div className="alerts_block">
      <div className="number_status">
        <span className="alerts_block_number">{index + 1}</span>
        <span className="alerts_block_status">{status}</span>
      </div>
      <span
        className="alerts_block_color"
        style={{
          background: color,
          borderColor: color,
        }}
      ></span>
      <button className="alerts_block_edit">
        <img src={editPen} alt="edit" onClick={toggleEditModal} />
      </button>
      {modalEditAlerts && (
        <ModalEditAlert
          status={status}
          color={color}
          id={id}
          active={modalEditAlerts}
          setModalEditAlertsActive={setModalEditAlertsActive}
        ></ModalEditAlert>
      )}
    </div>
  );
};

export default AlertsBlock;

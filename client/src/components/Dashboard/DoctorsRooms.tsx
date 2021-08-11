import { useState } from "react";
import { ModalPutAlert } from "./Modals/ModalPutAlert";
import { IRooms } from "../Types/Rooms";
import { AlertT } from "../../components/Types/Alerts";

import "./DoctorsRooms.scss";
import triangle from "../../img/triangle.svg";

interface DoctorsRooms {
  rooms: IRooms;
  alerts: AlertT[];
}

export const DoctorsRooms: React.FC<DoctorsRooms> = ({ rooms, alerts }) => {
  const [modalPutAlert, setModalPutAlertActive] = useState(false);

  const togglePutAlertModal = () => {
    setModalPutAlertActive((store) => !store);
  };

  return (
    <div className="room_wrap">
      <div className="doctor_rooms">
        <div className="dashboard_room_card">
          <div className="top">
            <div className="number_block">
              <span className="number">{rooms.name}</span>
            </div>
            <span className="r">R</span>
            <span className="time">10:56</span>
          </div>
          <div className="status" onClick={togglePutAlertModal}>
            {alerts && (
              <div
                className="round"
                style={{
                  backgroundColor: rooms.statusAlert?.color,
                  border: `2px solid ${rooms.statusAlert?.color}`,
                }}
              >
                <span>{rooms.statusAlert?.status.slice(0, 1)}</span>
              </div>
            )}
            <span className="choose_status">
              {rooms.statusAlert?.status}
              <img src={triangle} alt="triangle" />
            </span>
          </div>
        </div>
      </div>
      {modalPutAlert && (
        <ModalPutAlert
          rooms={rooms}
          alerts={alerts}
          active={modalPutAlert}
          setModalPutAlertActive={setModalPutAlertActive}
        ></ModalPutAlert>
      )}
    </div>
  );
};

export default DoctorsRooms;

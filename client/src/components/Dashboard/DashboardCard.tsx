import React from "react";
import DoctorsRoom from "./DoctorsRooms";
import { IRooms } from "../Types/Rooms";
import { AlertT } from "../../components/Types/Alerts";

import "./DashboardCard.scss";

interface DashboardProps {
  name: string;
  rooms: IRooms[] | undefined;
  alerts: AlertT[];
}

export const DashboardCard: React.FC<DashboardProps> = ({
  name,
  rooms,
  alerts,
}) => {
  return (
    <div className="card">
      <div className="doctor">
        <button className="reset">Reset</button>
        <span className="name">{name}</span>
        <span className="job">Doctor</span>
        <span className="doctor_line"></span>
        <div className="doctor_query">
          <button className="minus">-</button>
          <span className="state">{rooms?.length}</span>
          <button className="plus">+</button>
          <span className="in_line">in line</span>
          <button className="stop">Stop the line</button>
        </div>
      </div>
      <span className="line"></span>
      <div className="rooms_wrap">
        {rooms &&
          rooms.map((rooms) => (
            <DoctorsRoom alerts={alerts} rooms={rooms} key={rooms.id} />
          ))}
      </div>
    </div>
  );
};

export default DashboardCard;

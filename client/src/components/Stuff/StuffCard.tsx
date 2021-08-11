import React, { useState } from "react";

import { ModalEditStuff } from "./Modals/ModalEditStuff";
import { ModalDeleteUser } from "./Modals/ModalDeleteUser";
import { StuffT } from "../Types/Stuff";

import "./StuffCard.scss";

import edit from "../../img/editPen.svg";
import del from "../../img/trash.svg";

export const StuffCard: React.FC<StuffT> = ({
  number,
  name,
  email,
  phone,
  rooms,
  role,
  id,
}) => {
  console.log("stuff render");

  const [modalEditStuff, setModalEditStuffActive] = useState(false);
  const [modalDeleteUser, setModalDeleteUserActive] = useState(false);

  const toggleEditModal = () => {
    setModalEditStuffActive((store) => !store);
  };

  const toggleDeleteModal = () => {
    setModalDeleteUserActive((store) => !store);
  };

  return (
    <div className="stuffCard">
      <div className="doctor_id">
        <span className="id">{number}</span>
      </div>
      <span className="name">{name}</span>
      <span className="email">{email}</span>
      <span className="phone">{`+${phone}`}</span>
      {role === "Doctor"
        ? rooms && (
            <>
              <div className="colors">
                {rooms.map((color) => {
                  return (
                    <span
                      className="colors_round"
                      key={color.id}
                      style={{
                        background: color.statusAlert?.color,
                      }}
                    ></span>
                  );
                })}
              </div>
              <div className="rooms_list">
                <span>
                  Rooms:
                  {rooms.map((room, index) => (index ? ", " : "") + room.name)}
                </span>
              </div>
            </>
          )
        : null}

      <div className="buttons">
        <button>
          <img src={edit} alt="editUser" onClick={toggleEditModal} />
        </button>
        <button>
          <img src={del} alt="deleteUser" onClick={toggleDeleteModal} />
        </button>
        {modalEditStuff && (
          <ModalEditStuff
            role={role}
            name={name}
            phone={phone}
            email={email}
            id={id}
            active={modalEditStuff}
            setModalEditStuffActive={setModalEditStuffActive}
          ></ModalEditStuff>
        )}
        {modalDeleteUser && (
          <ModalDeleteUser
            role={role}
            id={id}
            active={modalDeleteUser}
            setModalDeleteUserActive={setModalDeleteUserActive}
          ></ModalDeleteUser>
        )}
      </div>
    </div>
  );
};

export default StuffCard;

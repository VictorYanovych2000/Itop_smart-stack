import React, { useState } from "react";
import { ModalEditRoom } from "./Modal/ModalEditRoom";
import { ModalDeleteRoom } from "./Modal/ModalDeleteRoom";
import { SequenceT } from "../Types/Sequence";

import "./SequenceCard.scss";
import add from "../../img/add.svg";
import del from "../../img/delete.svg";
import edit from "../../img/editPen.svg";

export const SequenceCard: React.FC<SequenceT> = ({
  name,
  id,
  ownerId,
  ownerName,
}) => {
  const [modalEditRoom, setModalEditRoomActive] = useState(false);

  const [modalDeleteRoom, setModalDeleteRoomActive] = useState(false);

  const toggleEditModal = () => {
    setModalEditRoomActive((store) => !store);
  };

  const toggleDeleteModal = () => {
    setModalDeleteRoomActive((store) => !store);
  };

  return (
    <div className="sequence_card">
      <div className="buttons">
        <img
          className="buttons__delete"
          src={del}
          alt="delete_item"
          onClick={toggleDeleteModal}
        />
        <img
          className="buttons__edit"
          src={edit}
          alt="edit_item"
          onClick={toggleEditModal}
        />
      </div>
      <div className="room_number">
        <img src={add} alt="add new room" />
        <span className="number">{name}</span>
      </div>
      <span className="name">{ownerName}</span>
      {modalEditRoom && (
        <ModalEditRoom
          key={id}
          id={id}
          ownerId={ownerId}
          ownerName={ownerName}
          active={modalEditRoom}
          setModalEditRoomActive={setModalEditRoomActive}
        ></ModalEditRoom>
      )}
      {modalDeleteRoom && (
        <ModalDeleteRoom
          key={id}
          id={id}
          active={modalDeleteRoom}
          setModalDeleteRoomActive={setModalDeleteRoomActive}
        ></ModalDeleteRoom>
      )}
    </div>
  );
};

export default SequenceCard;

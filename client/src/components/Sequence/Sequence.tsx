import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { SequenceDrag } from "./SequenceDrag";

import { SET_OWNER } from "../../graphql/Sequence/SetOwner";
import { CLEAR_OWNER } from "../../graphql/Sequence/ClearOwner";
import {
  GetAllRooms,
  GetAllSequenceResponse,
} from "../../graphql/Sequence/GetRooms";
import { SequenceT } from "../Types/Sequence";

import {
  GetAllUsers,
  GetByRole,
  GetByRoleResponse,
} from "../../graphql/Stuff/GetStuff";
import {
  getDoctors,
  GetDoctorsByResponse,
} from "../../graphql/Sequence/GetDoctors";
import "./Sequence.scss";

export interface ICurrentRooms {
  currentRooms: SequenceT[];
}

export interface IOtherRooms {
  otherRooms: SequenceT[];
}

export const Sequence = () => {
  const { data: dataRooms, loading: loadingRooms } =
    useQuery<GetAllSequenceResponse>(GetAllRooms);

  const { data: dataDoctors, loading: loadingDoctors } =
    useQuery<GetByRoleResponse>(GetByRole, {
      variables: { role: "Doctor" },
    });

  const [currentDoctor, setCurrentDoctor] = useState<string | undefined>();

  const [roomsCurrent, setRoomsCurrent] = useState<ICurrentRooms>({
    currentRooms: [],
  });

  const [roomsOther, setRoomsOther] = useState<IOtherRooms | any>({
    otherRooms: dataRooms?.getRooms,
  });

  const [setOwner] = useMutation(SET_OWNER);

  const [clearOwner] = useMutation(CLEAR_OWNER);

  const currentDoctorId = dataDoctors?.getByRole.find(
    (id) => id.name === currentDoctor
  )?.id;

  useEffect(() => {
    if (!currentDoctor) {
      setRoomsOther({
        otherRooms: dataRooms?.getRooms,
      });
    }
  }, [dataRooms]);

  function setNewName() {
    roomsCurrent.currentRooms.filter((name: any) =>
      name.ownerName !== currentDoctor
        ? setOwner({
            variables: {
              id: name.id,
              ownerId: currentDoctorId,
              ownerName: currentDoctor,
            },
            refetchQueries: [
              { query: GetAllRooms },
              { query: GetByRole, variables: { role: "Doctor" } },
            ],
          })
        : null
    );
  }

  function clearOldName() {
    roomsOther.otherRooms.filter((name: any) =>
      name.ownerName === currentDoctor
        ? clearOwner({
            variables: {
              id: name.id,
              ownerId: currentDoctorId,
              ownerName: currentDoctor,
            },
            refetchQueries: [
              { query: GetAllRooms },
              { query: GetByRole, variables: { role: "Doctor" } },
            ],
          })
        : ""
    );
  }

  if (loadingRooms || loadingDoctors) {
    return <span>Page is loading...</span>;
  }

  function handleSave() {
    if (currentDoctor) {
      return setNewName(), clearOldName();
    }
  }

  return (
    <div className="sequence">
      <div className="top">
        <div className="choose_title">Choose a Doctor</div>
        <button
          className={currentDoctor ? "save" : "save_disabled"}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div className="doctor">
        <select
          className="doctor__select"
          onChange={(e) => {
            setCurrentDoctor(e.currentTarget.value);
          }}
        >
          <option hidden>Make a choice</option>
          {dataDoctors?.getByRole?.map((sequence_doctor, index) => (
            <>
              <option key={sequence_doctor.id}>{sequence_doctor.name}</option>
            </>
          ))}
        </select>
      </div>
      <h1>Drag and Drop rooms to the box</h1>
      <div className="drag">
        <SequenceDrag
          roomsCurrent={roomsCurrent}
          setRoomsCurrent={setRoomsCurrent}
          roomsOther={roomsOther}
          setRoomsOther={setRoomsOther}
          dataRooms={dataRooms}
          currentDoctor={currentDoctor}
        ></SequenceDrag>
      </div>
    </div>
  );
};

export default Sequence;

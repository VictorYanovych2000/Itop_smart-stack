import { FC, Dispatch } from "react";
import { Form, Field } from "react-final-form";
import "./ModalRoom.scss";
import { DELETE_ROOM } from "../../../graphql/Sequence/DeleteRooms";
import { useMutation } from "@apollo/client";
import { GetAllRooms } from "../../../graphql/Sequence/GetRooms";
import { GetByRole } from "../../../graphql/Stuff/GetStuff";
import { getDoctors } from "../../../graphql/Dashboard/GetDoctors";

interface ModalRoomProps {
  active: boolean;
  setModalDeleteRoomActive: Dispatch<boolean>;
  id: number;
}

interface Errors {
  name?: string | null;
}

export const ModalDeleteRoom: FC<ModalRoomProps> = ({
  active,
  setModalDeleteRoomActive,
  id,
}) => {
  const [deleteRoom] = useMutation(DELETE_ROOM);

  const validate = (e) => {
    const errors: Errors = {};

    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalDeleteRoomActive(false);
    }
  };

  const onSubmit = () => {
    deleteRoom({
      variables: { id: id },
      refetchQueries: [
        { query: GetAllRooms },
        { query: GetByRole, variables: { role: "Doctor" } },
      ],
    });
    setModalDeleteRoomActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_sequence_content active" : "modal_sequence_content"
        }
      >
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="modal"
                render={({ input, meta }) => (
                  <div className="wrap">
                    <span className="desc">Are you sure?</span>
                    <Field name="name" render={({ input, meta }) => ""} />
                    <div className="btn_wrap">
                      <button
                        type="submit"
                        className="submit"
                        style={{ marginRight: "25px" }}
                      >
                        Yes
                      </button>
                      <button
                        className="submit"
                        onClick={() => setModalDeleteRoomActive(false)}
                      >
                        No
                      </button>
                    </div>
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              ></Field>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default ModalDeleteRoom;

import { FC, Dispatch } from "react";
import { useMutation } from "@apollo/client";
import { Form, Field } from "react-final-form";
import { CREATE_ROOM } from "../../../graphql/Sequence/CreateRooms";
import {
  GetAllRooms,
  GetAllSequenceResponse,
} from "../../../graphql/Sequence/GetRooms";
import "./ModalRoom.scss";

interface ModalRoomProps {
  active: boolean;
  setModalCreateRoomActive: Dispatch<boolean>;
  dataRooms: GetAllSequenceResponse;
}

interface Errors {
  name?: string | null;
}

export const ModalCreateRoom: FC<ModalRoomProps> = ({
  dataRooms,
  active,
  setModalCreateRoomActive,
}) => {
  const [CreateRoom] = useMutation(CREATE_ROOM);

  const validate = (e) => {
    const errors: Errors = {};

    let regexName = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    if (!e.name) {
      errors.name = "Name can't be empty";
    }

    if (e.name && e.name.match(regexName)) {
      errors.name = "Special symbols are forbiden";
    }

    if (e.name && e.name.length < 2) {
      errors.name = "Room name should contain 2 letters";
    }

    if (e.name && e.name.length > 2) {
      errors.name = "Room name should contain 2 letters";
    }

    if (e.name && dataRooms?.getRooms.find((name) => name.name === e.name)) {
      errors.name = "Room's name should be unique";
    }

    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalCreateRoomActive(false);
    }
  };

  const onSubmit = async (obj) => {
    CreateRoom({
      variables: { name: obj.name },
      refetchQueries: [{ query: GetAllRooms }],
    });
    setModalCreateRoomActive(false);
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
                    <span className="desc">Add new room</span>
                    <span className="field">Name:</span>
                    <Field
                      name="name"
                      render={({ input, meta }) => (
                        <div className="input">
                          <input
                            className="type"
                            {...input}
                            placeholder="name"
                          />
                          {meta.touched && meta.error && (
                            <span
                              style={{
                                fontSize: "14px",
                                display: "flex",
                                marginTop: "24%",
                                width: "auto",
                              }}
                            >
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    />
                    <div className="btn_wrap">
                      <button type="submit" className="submit">
                        Save
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

export default ModalCreateRoom;

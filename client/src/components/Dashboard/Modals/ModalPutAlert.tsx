import React, { Dispatch, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Field } from "react-final-form";
import "./ModalPutAlert.scss";
import { SET_ALERT } from "../../../graphql/Dashboard/SetAlert";
import { getDoctors } from "../../../graphql/Dashboard/GetDoctors";
import { GetByRole } from "../../../graphql/Stuff/GetStuff";
import { AlertT } from "../../Types/Alerts";
import { IRooms } from "../../Types/Rooms";

interface ModalPutAlertProp {
  active: boolean;
  setModalPutAlertActive: Dispatch<boolean>;
  alerts: AlertT[];
  rooms: IRooms;
}

export const ModalPutAlert: React.FC<ModalPutAlertProp> = ({
  active,
  setModalPutAlertActive,
  alerts,
  rooms,
}) => {
  const [activeAlert, setActiveAlert] = useState<AlertT>();

  const [setAlert] = useMutation(SET_ALERT);

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalPutAlertActive(false);
    }
  };

  const onSubmit = () => {
    setAlert({
      variables: {
        roomId: rooms.id,
        id: activeAlert?.id,
        color: activeAlert?.color,
        status: activeAlert?.status,
      },
      refetchQueries: [
        { query: getDoctors },
        { query: GetByRole, variables: { role: "Doctor" } },
      ],
    });
    setModalPutAlertActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_dashboard_content active" : "modal_dashboard_content"
        }
      >
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="modal"
                render={({ input, meta }) => (
                  <div className="wrap">
                    <Field
                      name="alerts"
                      render={({ input, meta }) => (
                        <div className="choose_alerts_block">
                          {alerts.map((obj, index) => {
                            {
                              return (
                                <div className="alerts_choice" key={obj.id}>
                                  <button
                                    className="block"
                                    onClick={() => setActiveAlert(obj)}
                                  >
                                    <div
                                      className="round"
                                      style={{
                                        backgroundColor: obj.color,
                                        border: `2px solid ${obj.color}`,
                                      }}
                                    >
                                      <span>{obj.status.slice(0, 1)}</span>
                                    </div>
                                    <span className="status">{obj.status}</span>
                                  </button>
                                </div>
                              );
                            }
                          })}
                          {meta.touched && meta.error && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    />

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

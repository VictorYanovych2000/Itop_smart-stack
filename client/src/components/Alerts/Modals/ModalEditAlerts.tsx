import React, { Dispatch, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Field } from "react-final-form";
import { EDIT_ALERT } from "../../../graphql/Alerts/EditAlerts";
import "./ModalAlert.scss";
import { GetAllAlerts } from "../../../graphql/Alerts/GetAlerts";
import { colors } from "./ModalCreateAlerts";

interface ModalAlertProps {
  active: boolean;
  setModalEditAlertsActive: Dispatch<boolean>;
  id: string;
  status: string;
  color: string;
}

interface Errors {
  name?: string | null;
}

export const ModalEditAlert: React.FC<ModalAlertProps> = ({
  active,
  setModalEditAlertsActive,
  id,
  status,
  color,
}) => {
  const [activeColor, setActiveColor] = useState(0);

  const [editAlert] = useMutation(EDIT_ALERT);

  const validate = (e) => {
    const errors: Errors = {};

    if (!e.name) {
      errors.name = "Name can't be empty";
    }
    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalEditAlertsActive(false);
    }
  };

  const onSubmit = (obj) => {
    editAlert({
      variables: { id: id, status: obj.name, color: colors[activeColor] },
      refetchQueries: [{ query: GetAllAlerts }],
    });
    setModalEditAlertsActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_alert_content active" : "modal_alert_content"
        }
      >
        <Form
          initialValues={{ name: status, color: color }}
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="modal"
                render={({ input, meta }) => (
                  <div className="wrap">
                    <h1>Edit alert</h1>
                    <span className="field">Name:</span>
                    <Field
                      name="name"
                      render={({ input, meta }) => (
                        <div className="name_input">
                          <input
                            className="name_type"
                            {...input}
                            placeholder="Alert"
                          />
                          {meta.touched && meta.error && (
                            <span
                              style={{
                                fontSize: "14px",
                                display: "flex",
                                marginTop: "18%",
                                width: "auto",
                              }}
                            >
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    />
                    <Field
                      type="radio"
                      name="color"
                      render={({ input, meta }) => (
                        <div
                          className="colors_block"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {colors.map((color, index) => (
                            <React.Fragment key={color + index}>
                              <input
                                type="radio"
                                id={`radio-${index}`}
                                className="hide"
                                {...input}
                                value={color}
                                onChange={() => setActiveColor(index)}
                              />
                              <label
                                htmlFor={`radio-${index}`}
                                className={`colors_list ${
                                  activeColor === index
                                    ? "colors_list_active"
                                    : ""
                                }`}
                                style={{
                                  backgroundColor: color,
                                  border: `2px solid ${color}`,
                                }}
                              ></label>
                            </React.Fragment>
                          ))}
                          <br />
                          {meta.touched && meta.error && (
                            <span>{meta.error}</span>
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

import { useMutation } from "@apollo/client";
import React, { Dispatch } from "react";
import { Form, Field } from "react-final-form";
import "./ModalStuff.scss";
import { EDIT_USER } from "../../../graphql/Stuff/EditStuff";
import { GetByRole } from "../../../graphql/Stuff/GetStuff";
import { getDoctors } from "../../../graphql/Dashboard/GetDoctors";
import { GetAllRooms } from "../../../graphql/Sequence/GetRooms";

interface ModalStuffProps {
  active: boolean;
  setModalEditStuffActive: Dispatch<boolean>;
  id: number;
  name: string;
  phone: number;
  email: string;
  role: string;
}

interface Errors {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  id?: number | null;
}

export const ModalEditStuff: React.FC<ModalStuffProps> = ({
  active,
  setModalEditStuffActive,
  id,
  name,
  email,
  phone,
  role,
}) => {
  const [editUser] = useMutation(EDIT_USER);

  const validate = (e) => {
    const errors: Errors = {};
    let regexPhone = /^\d+$/g;

    let regexName = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    if (!e.name) {
      errors.name = "Name can't be empty";
    }

    if (e.name && e.name.match(regexName)) {
      errors.name = "Special symbols are forbiden";
    }
    if (e.email && !e.email.includes("@")) {
      errors.email = "Email is incorrect.";
    }

    if (!e.email) {
      errors.email = "Email can't be empty";
    }

    if (e.email && !e.email.includes(".")) {
      errors.email = "Email is incorrect.";
    }

    if (!e.phone) {
      errors.phone = "Phone can't be empty";
    }

    if (e.phone && e.phone.length !== 12) {
      errors.phone = "Phone should contain 12 numbers";
    }

    if (e.phone && e.phone.includes("+")) {
      errors.phone = "+ is added automatically";
    }

    if (e.phone && !e.phone.match(regexPhone)) {
      errors.phone = "Only numbers are allowed";
    }

    return errors;
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalEditStuffActive(false);
    }
  };

  const onSubmit = (obj) => {
    editUser({
      variables: {
        id: id,
        name: obj.name,
        email: obj.email,
        phone: obj.phone,
        role: obj.role,
      },
      refetchQueries: [
        { query: GetByRole, variables: { role: "Doctor" } },
        { query: GetByRole, variables: { role: role } },
        { query: GetAllRooms },
      ],
    });
    setModalEditStuffActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div
        className={
          active ? "modal_stuff_content active" : "modal_stuff_content"
        }
      >
        <Form
          initialValues={{ name: name, email: email, phone: phone }}
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="modal"
                render={({ input, meta }) => (
                  <div className="wrap">
                    <h1>Edit</h1>
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
                            <span className="errors">{meta.error}</span>
                          )}
                        </div>
                      )}
                    />
                    <span className="field">Email:</span>
                    <Field
                      name="email"
                      render={({ input, meta }) => (
                        <div className="input">
                          <input
                            className="type"
                            {...input}
                            placeholder="email"
                          />
                          {meta.touched && meta.error && (
                            <span className="errors">{meta.error}</span>
                          )}
                        </div>
                      )}
                    />
                    <span className="field">Phone number:</span>
                    <Field
                      name="phone"
                      render={({ input, meta }) => (
                        <div className="input">
                          <input
                            className="type"
                            {...input}
                            placeholder="380000000000"
                          />
                          {meta.touched && meta.error && (
                            <span className="errors">{meta.error}</span>
                          )}
                        </div>
                      )}
                    />
                    <span className="field">Choose a role</span>
                    <Field
                      name="role"
                      component="select"
                      className="role"
                      defaultValue="Doctor"
                    >
                      <option className="options">Doctor</option>
                      <option className="options">Assistant</option>
                      <option className="options">Receptionist</option>
                    </Field>
                    <div className="btn_wrap">
                      <button type="submit" className="submit">
                        Save edit
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

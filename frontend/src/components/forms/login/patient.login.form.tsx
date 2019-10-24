import * as React from "react";
import { Form, IFields, required } from "../form";
import { Field } from "../field";

export const LoginPatientForm: React.SFC = () => {
  const fields: IFields = {
    username: {
      id: "username",
      label: "Username",
      validation: { rule: required }
    },
    password: {
      id: "password",
      label: "Password",
      validation: { rule: required }
    }
  };
  return (
    <Form
      action="http://localhost:3000/login"
      fields={fields}
      render={() => (
        <React.Fragment>
          <p></p>
          <div className="alert alert-info" role="alert">
            Please login
          </div>
          <Field {...fields.username} />
          <Field {...fields.password} />
        </React.Fragment>
      )}
    />
  );
};
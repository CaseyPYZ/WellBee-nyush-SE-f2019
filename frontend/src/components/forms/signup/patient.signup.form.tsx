import * as React from "react";
import { Form, IFields, required, isEmail, maxLength } from "../form";
import { Field } from "../field";

export const SignUpPatientForm: React.SFC = () => {
    const fields: IFields = {
        firstName: {
            id: "firstName",
            label: "First Name",
            validation: { rule: required }
        },
        lastName: {
            id: "lastName",
            label: "Last Name",
            validation: { rule: required }
        },
        dob: {
            id: "dob",
            label: "Date of Birth",
            validation: { rule: required }
        },
        email: {
            id: "email",
            label: "Email",
            validation: { rule: isEmail }
        }
    };
    return (
        <Form
            action="http://localhost:3000/signup"
            fields={fields}
            render={() => (
                <React.Fragment>
                    <p></p>
                    <div className="alert alert-info" role="alert">
                        Sign Up!
          </div>
                    <Field {...fields.firstName} />
                    <Field {...fields.lastName} />
                    <Field {...fields.dob} />
                    <Field {...fields.email} />
                </React.Fragment>
            )}
        />
    );
};
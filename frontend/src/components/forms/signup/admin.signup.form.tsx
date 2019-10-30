import * as React from "react";
import { Form, IFields, required, isEmail, maxLength } from "../form";
import { Field } from "../field";

export const SignUpAdminForm: React.SFC = () => {
    const fields: IFields = {
        email: {
            id: "email",
            label: "Email",
            validation: { rule: isEmail }
        }, 
        password: {
            id: "password",
            label: "Password",
            validation: { rule: required }
        }, 
        confirmPw: {
            id: "confirmPw",
            label: "Confirm Password",
            validation: { rule: required }
        }
    };
    return (
        <Form
            action="http://localhost:5000/signup"
            fields={fields}
            render={() => (
                <React.Fragment>
                    <p></p>
                    <div className="alert alert-info" role="alert">
                        Sign Up!
          </div>
                    <Field {...fields.email} />
                    <Field {...fields.password} />
                    <Field {...fields.confirmPw} />
                </React.Fragment>
            )}
        />
    );
};
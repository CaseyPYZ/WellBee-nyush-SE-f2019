import React, { Props } from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, waitForElement, findByTestId } from "@testing-library/react";
import Login from '../pages/login.public';
import AdminAuth from '../components/auth/admin.auth';
import PatientAuth from '../components/auth/patient.auth';
import DoctorAuth from '../components/auth/doctor.auth';

describe("<Login />", () => {
    test("should display three buttons that lead to individual login form,", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div)
        // const onUsernameChange = jest.fn();
        // const findByTestId = onUsernameChange;
        // const username = await findByTestId("login-button");

        // fireEvent.change(username, { target: { value: "test" } });

        // expect(onUsernameChange).toHaveBeenCalledWith("test");
    });
});

describe("<AdminAuth />", () => {
    test("should allow entering an email", async () => {
        // const findByTestId = jest.fn();
        // const email = await findByTestId("login-email");
      
        // fireEvent.change(email, { target: { value: "test" } });
        // expect(findByTestId).toHaveBeenCalledWith("test");
    });
});

describe("<DoctorAuth />", () => {
    test("should display admin login,", async () => {

    });
});

describe("<PatientAuth />", () => {
    test("should display admin login,", async () => {

    });
});
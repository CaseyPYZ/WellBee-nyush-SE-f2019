import React from 'react';
import { SignUpDoctorForm } from '../components/forms/signup/doctor.signup.form';
import { SignUpAdminForm } from '../components/forms/signup/admin.signup.form';
import { SignUpPatientForm } from '../components/forms/signup/patient.signup.form';
import { Tabs, Tab } from 'react-bootstrap';
import { SignupContainer } from '../styles/signup.style';

export default class SignupPage extends React.Component {

    render() {
        return (
            <SignupContainer>
                <Tabs defaultActiveKey="signup" id="uncontrolled-tab-example">
                    <Tab eventKey="Admin" title="Admin">
                        <SignUpAdminForm />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <SignUpDoctorForm />
                    </Tab>
                    <Tab eventKey="Patient" title="Patient">
                        <SignUpPatientForm />
                    </Tab>
                </Tabs>
            </SignupContainer>
        )
    }
}


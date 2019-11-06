import React from 'react';
import { LoginDoctorForm } from '../components/forms/login/doctor.login.form'
import { LoginAdminForm } from '../components/forms/login/admin.login.form';
import { LoginPatientForm } from '../components/forms/login/patient.login.form';
import { Tabs, Tab } from 'react-bootstrap';
import { LoginContainer } from '../styles/login.style';

export default class LoginPage extends React.Component {

    render() {
        return (
            <LoginContainer >
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="Admin" title="Admin">
                        <LoginAdminForm />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <LoginDoctorForm />
                    </Tab>
                    <Tab eventKey="Patient" title="Patient">
                        <LoginPatientForm />
                    </Tab>
                </Tabs>
            </LoginContainer>
        )
    }
}


import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { LoginContainer } from '../../../styles/login.style';
import AdminLogin from './admin.login.form';
import DoctorLogin from './doctor.login.form';
import PatientLogin from './patient.login.form';

export default class LoginPage extends React.Component<any> {

    constructor(props: any) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data: any) {
        this.props.handleLogin(data);
        this.props.history.push(`/home`);
    }

    render() {
        return (
            <LoginContainer>
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="Admin" title="Admin">
                        <AdminLogin className="tab-pane in fade active" handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <DoctorLogin handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Patient" title="Patient">
                        <PatientLogin handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                </Tabs>
            </LoginContainer>
        )
    }
}


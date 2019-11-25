import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SignupContainer } from '../../../styles/signup.style';
import DoctorSignup from './doctor.signup.form';
import PatientSignup from './patient.signup.form';
import AdminSignup from './admin.signup.form';

export default class SignupPage extends React.Component<any> {
    
    constructor(props: any) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data: any) {
        this.props.handleLogin(data);
    }

    render() {
        return (
            <SignupContainer>
                <Tabs defaultActiveKey="signup" id="uncontrolled-tab-example">
                    <Tab eventKey="Admin" title="Admin">
                        <AdminSignup handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <DoctorSignup handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab> 
                    <Tab eventKey="Patient" title="Patient">
                        <PatientSignup handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                </Tabs>
            </SignupContainer>
        )
    }
}


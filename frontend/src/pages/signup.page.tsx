import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SignupContainer } from '../styles/signup.style';
import Signup from '../components/forms/signup/admin.signup.form';

export default class SignupPage extends React.Component {

    render() {
        return (
            <SignupContainer>
                <Tabs defaultActiveKey="signup" id="uncontrolled-tab-example">
                    <Tab eventKey="Admin" title="Admin">
                        <Signup />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <Signup />
                    </Tab>
                    <Tab eventKey="Patient" title="Patient">
                        <Signup />
                    </Tab>
                </Tabs>
            </SignupContainer>
        )
    }
}


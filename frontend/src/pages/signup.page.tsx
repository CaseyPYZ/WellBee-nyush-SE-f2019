import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SignupContainer } from '../styles/signup.style';
import Signup from '../components/forms/signup/admin.signup.form';

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
                        <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Patient" title="Patient">
                        <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                </Tabs>
            </SignupContainer>
        )
    }
}

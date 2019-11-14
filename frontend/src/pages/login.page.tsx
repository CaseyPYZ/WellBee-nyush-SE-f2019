import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { LoginContainer } from '../styles/login.style';
import Login from '../components/forms/login/admin.login.form';

export default class LoginPage extends React.Component<any> {

    constructor(props: any) {
        super(props);
<<<<<<< HEAD

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data: any) {
        this.props.handleLogin(data);
    }

    render() {
        return (
            <LoginContainer >
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="Admin" title="Admin">
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Patient" title="Patient">
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                </Tabs>
            </LoginContainer>
        )
    }
}

=======

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data: any) {
        this.props.handleLogin(data);
    }

    render() {
        return (
            <LoginContainer >
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="Admin" title="Admin">
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                    <Tab eventKey="Patient" title="Patient">
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Tab>
                </Tabs>
            </LoginContainer>
        )
    }
}
>>>>>>> master

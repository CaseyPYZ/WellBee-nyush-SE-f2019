import React, { useState } from 'react';
import { AuthForm } from '../style/login.style';

const LoginPage = () => {

    const [{username, password}, setCredentials] = useState({
        username: '',
        password: ''
    });

    return (
        <div>
            <AuthForm>
                <label htmlFor="username"> Username </label>
                <input placeholder="username" value={username} onChange={(event) => setCredentials ({
                    username: event.target.value,
                    password
                })} />
                <label htmlFor="password"> Password </label>
                <input placeholder="password" type="password" onChange={(event) => setCredentials ({
                    username,
                    password: event.target.value
                })}/>
                <button type="submit"> Login </button>
            </AuthForm>
        </div>
    )
}

export default LoginPage;
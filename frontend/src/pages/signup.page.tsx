import React, { useState } from 'react';
import { SignupForm } from '../style/signup.style';

const SignupPage = () => {

    const [{ user, name, age, sex, lock, profile }, setCredentials] = useState({
        user: '',
        name: '',
        age: '',
        sex: '',
        lock: '',
        profile: [],
    });

    return (
        <div>
            <SignupForm>
                <label htmlFor="name"> Name </label>
                <input placeholder="name" value={user} onChange={(event) => setCredentials({
                    user,
                    name: event.target.value,
                    age,
                    sex,
                    lock,
                    profile
                })} />
                <label htmlFor="age"> Age </label>
                <input placeholder="age" value={age} onChange={(event) => setCredentials({
                    user,
                    name,
                    age: event.target.value,
                    sex,
                    lock,
                    profile
                })} />
                <label htmlFor="sex"> Sex </label>
                <input placeholder="sex" value={sex} onChange={(event) => setCredentials({
                    user,
                    name,
                    age,
                    sex: event.target.value,
                    lock,
                    profile
                })} />
                <label htmlFor="user"> User </label>
                <input placeholder="user" value={user} onChange={(event) => setCredentials({
                    user: event.target.value,
                    name,
                    age,
                    sex,
                    lock,
                    profile
                })} />
                <button type="submit"> Sign Up </button>
            </SignupForm>
        </div>
    )
}


export default SignupPage;

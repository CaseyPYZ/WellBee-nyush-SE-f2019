import React from 'react';
import '../setup.test';
import { shallow } from 'enzyme';
import Login from '../components/auth/login/admin.login.form'

// describe ('Login', () => {
//     const login = new Login('123@gmail.com');
//     it ('Form should be post to /login', async() => {
//         const action = await login.action;
//         expect(action).toBe('http://localhost:3000/login');
//     })
// })
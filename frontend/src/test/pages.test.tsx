import React from 'react';
import '../setup.test';
import { shallow } from 'enzyme';
import { Form } from '../components/forms/form'

describe ('Form', () => {
    const form = new Form();
    it ('Form should be post to /login', async() => {
        const action = await form.action;
        expect(action).toBe('http://localhost:3000/login');
    })
})
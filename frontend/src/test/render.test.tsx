import React from 'react';
import '../setup.test';
import { shallow } from 'enzyme';
import { ContactUsForm } from '../components/forms/contactus/contactus.form';
import { LoginAdminForm } from '../components/forms/login/admin.login.form';

it('renders without crashing', () => {
  shallow(<ContactUsForm />);
});

it('renders without crashing', () => {
  shallow(<LoginAdminForm />);
});

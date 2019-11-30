
import React from 'react';
import '../setup.test';
import { shallow } from 'enzyme';
import NavBarComponent from '../components/layout/navbar';

describe('Navbar', () => {
  it('Navbar Component should render', () => {
    const component = shallow(<NavBarComponent />);
    expect(component).toMatchSnapshot();
  });
});

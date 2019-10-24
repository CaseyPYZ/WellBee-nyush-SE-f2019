
import React from 'react';
import '../setup.test';
import { shallow } from 'enzyme';
import NavBarComponent from '../components/navbar/navbar.component';

describe('Navbar', () => {
  it('Navbar Component should render', () => {
    const component = shallow(<NavBarComponent />);
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import NameTaker from './NameTaker';

describe('Name Taker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NameTaker />);
  });

  it('should have a form element', () => {
    expect(component.type()).to.equal('div');

    const form = component.find('form');

    expect(form.type()).to.equal('form');
  });
});

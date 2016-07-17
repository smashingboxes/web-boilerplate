import React from 'react';
import { shallow } from 'enzyme';

import NameTaker from './NameTaker';

describe('Name Taker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NameTaker />);
  });

  it('should have a form element', () => {
    expect(component).to.have.tagName('div');

    const form = component.find('form');

    expect(form).to.have.tagName('form');
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import Greeting from './Greeting';

describe('Greeting', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Greeting />);
  });

  it('should display the text "Hello, "', () => {
    expect(component.type()).to.equal('div');

    const div = component.childAt(0);
    const text = component.childAt(1);

    expect(div.type()).to.equal('div');
    expect(div.hasClass('greeting__icon')).to.be.true;

    expect(text.text()).to.equal('Hello, ');
  });
});

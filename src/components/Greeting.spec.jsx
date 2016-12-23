import React from 'react';
import { shallow } from 'enzyme';

import Greeting from './Greeting';

describe('Greeting', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Greeting />);
  });

  it('should display the text "Hello, "', () => {
    expect(wrapper).to.have.tagName('div');

    const div = wrapper.childAt(0);

    expect(div).to.have.tagName('div');
    expect(div).to.have.className('c-greeting__icon');

    expect(wrapper).to.have.text('Hello, World');
  });
});

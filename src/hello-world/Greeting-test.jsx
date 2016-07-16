import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Greeting from './Greeting';

describe('Greeting', () => {
  const renderer = ReactTestUtils.createRenderer();
  let component;

  beforeEach(() => {
    renderer.render(<Greeting />);
    component = renderer.getRenderOutput();
  });

  it('should display the text "Hello, "', () => {
    expect(component.type).to.equal('div');

    const [div, text] = component.props.children;

    expect(div.type).to.equal('div');
    expect(div.props.className).to.equal('greeting__icon');

    expect(text).to.equal('Hello, ');
  });
});

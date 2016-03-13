import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

import HelloWorld from './HelloWorld';

describe('Hello World', () => {
  const renderer = ReactTestUtils.createRenderer();
  let component;

  beforeEach(() => {
    renderer.render(<HelloWorld />);
    component = renderer.getRenderOutput();
  });

  it('should display the text "Hello, World"', () => {
    expect(component.type).to.equal('div');

    const [div, text] = component.props.children;

    expect(div.type).to.equal('div');
    expect(div.props.className).to.equal('hello-world__icon');

    expect(text).to.equal('Hello, World');
  });
});

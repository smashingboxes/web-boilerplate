import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import NameTaker from './NameTaker';

describe('Name Taker', () => {
  const renderer = ReactTestUtils.createRenderer();
  let component;

  beforeEach(() => {
    renderer.render(<NameTaker />);
    component = renderer.getRenderOutput();
  });

  it('should have a form element', () => {
    expect(component.type).to.equal('div');

    const form = component.props.children;

    expect(form.type).to.equal('form');
  });
});

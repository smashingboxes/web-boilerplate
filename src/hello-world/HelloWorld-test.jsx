import ReactTestUtils from 'react-addons-test-utils';

import HelloWorld from './HelloWorld';

describe('Hello World', () => {
  const renderer = ReactTestUtils.createRenderer();
  let component;

  beforeEach(() => {
    renderer.render(<HelloWorld />);
    component = renderer.getRenderOutput();
  });

  it('should display the text "Hello, World"', () => {
    expect(component.props.children).to.eql('Hello, World');
  });
});

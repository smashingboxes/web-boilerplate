const chai = require('chai');
const chaiImmutable = require('chai-immutable');

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

chai.use(chaiImmutable);

Enzyme.configure({ adapter: new Adapter() });

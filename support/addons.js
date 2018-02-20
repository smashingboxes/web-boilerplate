const chai = require('chai');
const chaiImmutable = require('chai-immutable');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');

chai.use(chaiImmutable);
chai.use(sinonChai);
chai.use(chaiEnzyme());

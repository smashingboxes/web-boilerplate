const chai = require('chai');
const chaiImmutable = require('chai-immutable');
const chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme());
chai.use(chaiImmutable);

import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as mocha from 'mocha';

// import {Response} from 'express';

import app from '../lib/app';
// import { format } from 'path';

chai.use(chaiHttp);

const expect = chai.expect;

describe('baseRoute', () => {
    it('should respond with HTTP 200 status', () => {
        return chai.request(app)
            .get('/')
            .then((res) => {
                expect(res.status).to.be.equal(200);
            });
    });
});
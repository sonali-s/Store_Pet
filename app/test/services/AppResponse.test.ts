import chai from 'chai';
import chatAsPromised, { transformAsserterArgs } from 'chai-as-promised';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import {AppResponse} from '../../services/AppResponse';
const expect = chai.expect;
chai.use(chatAsPromised);

describe('AppResponse Service Test', async () => {
    let res;
    let appResponse;

    beforeEach(async () => {
        res = mockRes();
        appResponse = await new AppResponse();
    });

    after(async () => {
        sinon.restore();
    });

    it('should test success response format', async () => {
        const statusCode = 200;
        const data = {};
        const envelope = {
            status: 'SUCCESS',
            // tslint:disable-next-line:object-literal-sort-keys
            data,
        };

        await appResponse.success(res, data);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test error response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 500;
        const envelope = {
            status: 'ERROR',
            // tslint:disable-next-line:object-literal-sort-keys
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        };

        await appResponse.error(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test badRequest response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 400;
        const envelope = {
            status: 'FAILURE',
            // tslint:disable-next-line:object-literal-sort-keys
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        };

        await appResponse.badRequest(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });
    it('should test notFound response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 404;
        const envelope = {
            status: 'FAILURE',
            // tslint:disable-next-line:object-literal-sort-keys
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        };

        await appResponse.notFound(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });
});

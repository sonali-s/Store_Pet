import { Response } from 'express';

export class AppResponse {
    protected readonly SUCCESS = 200;
    protected readonly NO_CONTENT = 204;
    protected readonly BAD_REQUEST = 400;
    protected readonly NOT_FOUND = 404;
    protected readonly CONFLICT = 409;
    protected readonly UNPROCESSABLE_ENTITY = 422;
    protected readonly INTERNAL_SERVER_ERROR = 500;

    public success = (res: Response, data: any) => {
        res.status(this.SUCCESS).send({
            status: 'SUCCESS',
            data,
        });
    }

    public error = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.INTERNAL_SERVER_ERROR).send({
            status: 'ERROR',
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        });
    }

    public unprocessableEntity = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.UNPROCESSABLE_ENTITY).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        });
    }

    public badRequest = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.BAD_REQUEST).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        });
    }

    public conflict = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.CONFLICT).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        });
    }

    public noContent = (res: Response) => {
        res.status(this.NO_CONTENT).send({});
    }

    public notFound = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.NOT_FOUND).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    description,
                    message,
                },
            },
        });
    }
}

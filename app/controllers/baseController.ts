import {AppResponse} from './../services/appResponse';

export default class BaseController {
    protected appResponse: AppResponse;

    public constructor() {
        this.appResponse = new AppResponse();
    }
}

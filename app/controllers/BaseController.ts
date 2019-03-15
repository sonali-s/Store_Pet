import {AppResponse} from '../services/AppResponse';

export default class BaseController {
    protected appResponse: AppResponse;

    public constructor() {
        this.appResponse = new AppResponse();
    }
}

import { Request, Response} from 'express';
import mongoose from 'mongoose';
import AppConstants from '../constants/AppConstant';
import Pet from '../models/Pet';
import PetService from '../services/PetService';
import BaseController from './BaseController';
import ServiceError from '../errors/ServiceError';

export class PetController extends BaseController {
    private petService: PetService;

    public constructor(petService: PetService) {
        super();
        this.petService = petService;
    }
    public createPet = async (req: Request, res: Response) => {
        try {
            const newPet = new Pet({
                _id : new mongoose.Types.ObjectId,
                category: {
                    category_id : new mongoose.Types.ObjectId,    
                    name: req.body.category.name
                },
                name: req.body.name,
                photoUrls: req.body.photoUrls,
                tags: {
                    tag_id : new mongoose.Types.ObjectId,
                    name: req.body.tags.name
                },
                status: req.body.status
            });
            const response = await this.petService.createPet(newPet);
            return await this.appResponse.success(res, {response});
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.error(
                    res,
                    AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                    AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
                    'Description'
                );
            } else {
                throw error;
            }
        }
    }
    public getAllPets = async (req: Request, res: Response) => {
        try {
            const pets = await this.petService.getAllPets();
            return this.appResponse.success(res, {pets});
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.notFound(
                    res,
                    AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND,
                    'Description'
                );
            } else {
                throw error;
            }
        }
    }
    public searchBy = async (req: Request, res: Response) => {
        try {
            const id = req.query.petId;
            const name = req.query.petName;
            const result = await this.petService.searchBy(id, name);
            return this.appResponse.success(res, {result});
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.notFound(
                    res,
                    AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND,
                    'Description'
                );
            }
            else if( req.query.petId && !mongoose.Types.ObjectId.isValid(req.query.petId) ){
                return this.appResponse.badRequest(
                    res,
                    AppConstants.ERROR_CODES.ERR_BAD_REQUEST,
                    AppConstants.ERROR_MESSAGES.ERR_BAD_REQUEST,
                    'Description'
                )
            } else {
                throw error;
            }  
        }
    }
    public updatePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const result = await this.petService.updatePet(id, req.body);
            return this.appResponse.success(res, {result});
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.notFound(
                    res,
                    AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND,
                    'Description'
                );    
            }
            else if( !mongoose.Types.ObjectId.isValid(req.params.petId) ){
                return this.appResponse.badRequest(
                    res,
                    AppConstants.ERROR_CODES.ERR_BAD_REQUEST,
                    AppConstants.ERROR_MESSAGES.ERR_BAD_REQUEST,
                    'Description'
                )
            } else {
                throw error;
            }
        }
    }
    public deletePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            await this.petService.deletePet(id);
            return await this.appResponse.success(res, 'Data successfully deleted');
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.notFound(
                    res,
                    AppConstants.ERROR_CODES.ERR_NOT_FOUND,
                    AppConstants.ERROR_MESSAGES.ERR_NOT_FOUND,
                    'Description'
                );
            }
            else if( !mongoose.Types.ObjectId.isValid(req.params.petId) ){
                return this.appResponse.badRequest(
                    res,
                    AppConstants.ERROR_CODES.ERR_BAD_REQUEST,
                    AppConstants.ERROR_MESSAGES.ERR_BAD_REQUEST,
                    'Description'
                )
            } else {
                throw error;
            }
        }
    }
}

export default PetController;

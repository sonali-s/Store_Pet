import { Request, Response} from 'express';
import mongoose from 'mongoose';
import AppConstants from '../constants/AppConstant';
import Pet from '../models/Pet';
import PetService from '../services/PetService';
import BaseController from './BaseController';

export class PetController extends BaseController {
    private petService: PetService;

    public constructor(petService: PetService) {
        super();
        this.petService = petService;
    }
    public createPet = (req: Request, res: Response) => {
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
            this.petService.createPet(newPet);
            return this.appResponse.success(res, {newPet});
        } catch (error) {
            return this.appResponse.error(
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }
    public getAllPets = async (req: Request, res: Response) => {
        try {
            const pets = await this.petService.getAllPets();
            return this.appResponse.success(res, {pets});
        } catch (error) {
            return this.appResponse.error(
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }
    public getPetById = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const pet = await this.petService.getPetById(id);
            return this.appResponse.success(res, {pet});
        } catch (error) {
            return this.appResponse.error(
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }
    public getPetByName = async (req: Request, res: Response) => {
        try {
            let name = req.params.petName;
            name = '^' + name;
            const pet = await this.petService.getPetByName(name);
            return this.appResponse.success(res, {pet});
        } catch (error) {
            return this.appResponse.error (
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }
    public updatePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const result = await this.petService.updatePet(id, req.body);
            return this.appResponse.success(res, {result});
        } catch (error) {
            return this.appResponse.error(
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }
    public deletePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const deletedPet = await this.petService.deletePet(id);
            return this.appResponse.success(res, {deletedPet});
        } catch (error) {
            return this.appResponse.error(
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }
}

export default PetController;

// // GET /pets/petId gives a pet by id
// export let getPet = (req: Request, res: Response) => {
//     Pet.findById(req.params.petId, (err: any, pets: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(pets);
//         }
//     });
// };
// // POST /pets lets insert a new pet
// export let addPet = (req: Request, res: Response) => {
//     const pet = new Pet(req.body);

//     pet.save((err: any, pets: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(pets);
//         }
//     });
// };

// // PUT /pets/petId lets update a pet by id
// export let updatePet = (req: Request, res: Response) => {
//     Pet.findByIdAndUpdate(req.params.petId, req.body, (err: any, pets: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send("Successfully updated the Pet details");
//         }
//     });
// };

// // DELETE /pets/d lets delete a pet by id
// export let deletePet = (req: Request, res: Response) => {
//     Pet.deleteOne({ _id: req.params.petId }, (err: any) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send("Successfully deleted the pet details");
//         }
//     });
// };